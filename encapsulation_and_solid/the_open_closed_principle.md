# Open Closed Principle OCP

Class should be open for extensibility but close for modification. (Bug fixing OK)

Needless complexity - we have more than one classes

"Developers have a tendency to attempt to solve specific problems with general solution"
"This lead to coupling and complexity"
"Instead to be genenar code should be specific" (Greg Young)

Following the SRP, each concreate class is very specific.

Store

```
public class FileStore : IStoreWriter, IStoreReader, IFileLocator
{
  public void WriteAllText(string path, stirng message)
  {
    File.WriteAllText(path, message);
  }

  public string ReadAllText(string path)
  {
    return File.ReadAllText(path);
  }

  public FileInfo GetFileInfo(int id, string workingDirectory)
  {
    return new FileInfo(
      Path.Combine(workingDirectory, id + ".txt"));
  }
}
```

Reused abstractions principle

Abstraction is the elimination of the irrelevant and amplification of the essential.

Three classes could implement the same interface.

Discover abstractions as commonality emerges.

Rule of three:

if you have three examples of code thet looks like similar should you introduse the abstraction.

## Favour composition over inheritance.

Class FileStore open for extensibility. (Add virtual modificator)

```
public class FileStore
{
  public virtual void WriteAllText(string path, stirng message)
  {
    File.WriteAllText(path, message);
  }

  public virtual string ReadAllText(string path)
  {
    return File.ReadAllText(path);
  }

  public virtual FileInfo GetFileInfo(int id, string workingDirectory)
  {
    return new FileInfo(
      Path.Combine(workingDirectory, id + ".txt"));
  }
}
```

StoreCache

```
public class StoreCache
{
  private readonly ConcurrentDictionary<int, string> cache;

  public StoreCache()
  {
    this.cache = new ConcurrentDictionary<int, string> ();
  }

  public virtual void AddOrUpdate(int id, string message)
  {
    this.cache.AddOrUpdate(id, message, (i,s) => message);
  }

  public virtual string GetOrAdd(int id, Func<int, string> messageFactory)
  {
    return this.cache.GetOrAdd(id, messageFactory);
  }
}
```

StoreLogger

```
public class StoreLogger
{
  public virtual void Saving(int id){
    Log.Information("Saving message {id}", id);
  }

  public virtual void Saved(int id){
    Log.Information("Saved message {id}", id);
  }

  public virtual void Reading(int id){
    Log.Debug("Reading message {id}", id);
  }

  public virtual void DidNotFind(int id){
    Log.Debug("No message {id} found", id);
  }

  public virtual void Returning(int id){
    Log.Debug("Returning message {id}", id);
  }
}
```

```
public class MessageStore
{
  private readonly StoreCache cache; //new cache
  private readonly StoreLogger log; //new logger
  private readonly FileStore fileStore;

  public FileStore(DirectoryInfo workingDirectory)
  {
    if (workingDirectory == null)
      throw new ArgumentNullExeption("workingDirectory");
    if (!Directory.Exists(workingDirectory))
      throw new ArgumentException("Boo", "workingDirectory")

    this.WorkingDirectory = workingDirectory;
    this.  = new ConcurrentDictionary<int, string>(); //create
    this.log = new StoreLogger(); //create
    this.fileStore = new FileStore();
  }

  public DirectoryInfo WorkingDirectory {get, private set};

  public void Save(int id, string message)
  {
    this.Log.Saving(id);      //capital lof -> Log
    var file = this.GetFileInfo(id);
    this.Store.WriteAllText(file.FullName, message);
    this.Cache.AddOrUpdate(id, message, (i, s) => message);
    this.Log.Saved(id);
  }

  public Maybe<string> Read(int id)
  {
    this.Log.Reading(id);
    var file = this.GetFileInfo(id);
    if (!file.Exists)
    {
      this.Log.DidNotFind(id);
      return new Maybe<string>();
    }
    var message = this.Cache.GetOrAdd(id, _=> this.Store.ReadAllText(file.FullName)); //use new store
    this.Log.Returning(id);
    return new Maybe<string>(message);
  }

  public FileInfo GetFileInfo(int id)
  {
    return this.Store.GetFileInfo(id, this.WorkingDirectory.FullName);
  }

  protected virtual FileStore Store //call private field
  {
    get { return this.fileStore; }
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

### Factory Method (design pattern)

Polymorphic class

### Strategy (design pattern)

One way to open class for extensibility but close for modification.

### Composite (design pattern)

### Decorator (design pattern)
