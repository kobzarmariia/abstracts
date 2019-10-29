# Liscov Substitution Principle LSP

How polymorphism should work (Composition)

CRUD for class:

Create
Read

(open for extensibility but close for modification)
Update
Delete

How do you evolve such a code base? (if you can`t change)

## Strangler (design pattern)

How to change one system with another one. (how to change old classes with new behavior)

Clients from old class shoud go to the new class.

X509Certificate -> X509Certificate2

Obsolete attribute - all client use old class still work, but warning tell that they should migrate to the new class.
And classes that depend each other migrate automatically.

```
[Obsolete("Please use Foo2 instead.", true)]
public class Foo
{
  //...
}
```

## Liscov Substitution Principle

Subtypes must be substitutable for their base types.

Consume any implementation without changing the correctness of the system.

What does the correctness of the system mean? (correct behavior, because polimorfizm it's all about changing behavior)

Violating LSP:

- Not supported exception (C# collection)

```
ICollection<T>
- Add
- Clear
- Contains
- CopyTo
- Remove
...
```

ReadOnlyCollection (implements )-> ICollection
But you can`t remove methods.

```
ReadOnlyCollection<T>  //throw new NotSupportedException()
- Add (can`t)
- Clear (can`t)
- Contains
- CopyTo
- Remove (can`t)
...
```

- Downcasts
- Extracted interfaces

! LSP is often violated by attempts to remove features.

Reused abstractions principle compliance indicates LSP compliance.

IStore

```
public interface IStore
{
  void WriteAllText(int id, stirng message); // string path -> int id

  Maybe<string> ReadAllText(int id); //path -> id, string -> Maybe<string>

  FileInfo GetFileInfo(int id); //remove string workingDirectory, but here id
}
```

IStoreCache

```
public interface IStoreCache
{
  void AddOrUpdate(int id, stirng message);

  string GetOrAdd(int id, Func<int, string> messageFactory);
}
```

StoreCache

```
public class StoreCache : IStoreCache
{
  private readonly ConcurrentDictionary<int, Maybe<string>> cache;

  public StoreCache()
  {
    this.cache = new ConcurrentDictionary<int, Maybe<string>> ();
  }

  public virtual void AddOrUpdate(int id, string message)
  {
    var m = new Maybe<string>(message);
    this.cache.AddOrUpdate(id, m, (i,s) => message);
  }

  public virtual string GetOrAdd(int id, Func<int, Maybe<string>> messageFactory) //string -> Maybe<string>
  {
    return this.cache.GetOrAdd(id, messageFactory);
  }
}
```

FileStore

```
public class FileStore : IStore
{
  private readonly DirectoryInfo workingDirectory;  //add workingDirectory

  public FileStore(DirectoryInfo workingDirectory)
  {
    if (workingDirectory == null)
      throw new ArgumentNullExeption("workingDirectory");
    if (!workingDirectory.Exists)
      throw new ArgumentException("Boo", "workingDirectory");

    this.workingDirectory = workingDirectory;
  }

 public virtual void WriteAllText(string path, stirng message) //virtual
 {
   File.WriteAllText(path, message);
 }

 public virtual Maybe<string> ReadAllText(int id) //
 {
   var file = this.GetFileInfo(id);
    if (!file.Exists)
    {
      return new Maybe<string>();
    }
    var path = file.FullName;
   return new Maybe<string>(File.ReadAllText(path));
 }

 public virtual FileInfo GetFileInfo(int id, string workingDirectory)
 {
   return new FileInfo(Path.Combine(this.workingDirectory.FullName, id + ".txt"));
 }
}
```

SqlStore

```
public class SqlStore : IStore // FileStore -> IStore
{
 public void WriteAllText(string path, string message)  //override
 {
   //Write to DB here
 }

 public Maybe<string> ReadAllText(string path) //string -> Maybe<string>
 {
   //Read and return from DB
 }

 public FileInfo GetFileInfo(int id) // string workingDirectory
 {
    //return a bogus FileInfo here
    throw new NotSupportedException();
    //return base.GetFileInfo(id, workingDirectory);
  }
```

MessageStore

```
public class MessageStore
{
  private readonly StoreCache cache;
  private readonly StoreLogger log;
  private readonly IStore store;                  //FileStore -> IStore

  public MessageStore(DirectoryInfo workingDirectory)
  {
    if (workingDirectory == null)
      throw new ArgumentNullExeption("workingDirectory");
    if (!Directory.Exists(workingDirectory))
      throw new ArgumentException("Boo", "workingDirectory")

    this.WorkingDirectory = workingDirectory;
    this.  = new ConcurrentDictionary<int, string>();
    this.log = new StoreLogger();
    this.store = new FileStore();                 //fileStore -> store or (SQLstore)
  }

  public DirectoryInfo WorkingDirectory {get, private set};

  public void Save(int id, string message)
  {
    this.Log.Saving(id);
    //var file = this.GetFileInfo(id);
    this.Store.WriteAllText(id, message); //file.FullName -> id
    this.Cache.AddOrUpdate(id, message);
    this.Log.Saved(id);
  }

  public Maybe<string> Read(int id)
  {
    this.Log.Reading(id);
    //var file = this.GetFileInfo(id);
    var message = this.Cache.GetOrAdd(
      id, _=> this.Store.ReadAllText(id));
    if (message.Any())
      this.Log.Returning(id);
    else
      this.Log.DidNotFind(id);
    return message;
  }

  public FileInfo GetFileInfo(int id)
  {
    return this.Store.GetFileInfo(id);
  }

  protected virtual IStore Store //call private field
  {
    get { return this.store; }
  }

  protected virtual StoreCache Cache
  {
    get { return this.cache; }
  }

  protected virtual StoreLogger Log
  {
    get { return this.log; }
  }
}
```
