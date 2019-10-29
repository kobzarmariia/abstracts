# Single Responsibility Principle SRP

Class should have only one responsibility.
A class should have only one reason to change.
Separation of concerns.
Do one thing, and do it well.

SOLID code - supple code (not a pattern)

The purpose of SOLID is to make you more productive,
by making code more maintainable,
through decomposition and decoupling.

## Design smell

- Rigidity - the design is difficult to change
- Fragility - the design is easy to break
- Immobility - the design is difficult to reuse
- Viscosity - it`s difficult to do the right things
- Needless complexity - overdesign

string -> DirectoryInfo and FileInfo

```
public class FileStore
{
  public FileStore(DirectoryInfo workingDirectory);

  public DirectoryInfo WorkingDirectory {get;}

  public void Save(int id, string message)

  public Maybe<string> Read(int id)

  public FileInfo GetFileInfo(int id)
}
```

! Logging, caching, storage, orchestration - reasons why this code might change.
(we do smth similar, a lots of code dublication)

```
public void Save(int id, string message)
{
  Log.Information("Saving message {id}.", id);
  var file = this.GetFileInfo(id);
  File.WriteAllText(file.FullName, message);
  this.cache.AddOrUpdate(id, message, (i, s) => message);
  Log.Information("Saved message {id}.", id);
}

public Maybe<string> Read(int id)
{
  Log.Debug("Reading message {id}", id);
  var file = this.GetFileInfo(id);
  if (!file.Exists)
  {
    Log.Debug("No message {id} found", id);
    return new Maybe<string>();
  }
  var message = this.cache.GetOrAdd(id, _=>
    File.ReadAllText(file.FullName));
  Log.Debug("Returning message {id} found", id);
  return new Maybe<string>(message);
}
```

Logging

```
public class StoreLogger
{
  public void Saving(int id){
    Log.Information("Saving message {id}", id);
  }

  public void Saved(int id){
    Log.Information("Saved message {id}", id);
  }

  public void Reading(int id){
    Log.Debug("Reading message {id}", id);
  }

  public void DidNotFind(int id){
    Log.Debug("No message {id} found", id);
  }

  public void Returning(int id){
    Log.Debug("Returning message {id}", id);
  }
}
```

Cache

```
public class StoreCache
{
  private readonly ConcurrentDictionary<int, string> cache;

  public StoreCache()
  {
    this.cache = new ConcurrentDictionary<int, string> ();
  }

  public void AddOrUpdate(int id, string message)
  {
    this.cache.AddOrUpdate(id, message, (i,s) => message);
  }

  public string GetOrAdd(int id, Func<int, string> messageFactory)
  {
    return this.cache.GetOrAdd(id, messageFactory);
  }
}
```

Store

```
public class FileStore
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
      Path.Combine(workingDirectory, id + ".txt")
    );
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
    this.cache = new ConcurrentDictionary<int, string>(); //create
    this.log = new StoreLogger(); //create
    this.fileStore = new FileStore();
  }

  public DirectoryInfo WorkingDirectory {get, private set};

  public void Save(int id, string message)
  {
    this.log.Saving(id);
    var file = this.GetFileInfo(id);
    this.fileStore.WriteAllText(file.FullName, message); //use new store
    this.cache.AddOrUpdate(id, message, (i, s) => message);
    this.log.Saved(id);
  }

  public Maybe<string> Read(int id)
  {
    this.log.Reading(id);
    var file = this.GetFileInfo(id);
    if (!file.Exists)
    {
      this.log.DidNotFind(id);
      return new Maybe<string>();
    }
    var message = this.cache.GetOrAdd(id, _=> this.fileStore.ReadAllText(file.FullName)); //use new store
    this.log.Returning(id);
    return new Maybe<string>(message);
  }

  public FileInfo GetFileInfo(int id)
  {
    return this.fileStore.GetFileInfo(id, this.WorkingDirectory.FullName);
  }
}
```

MessageStore (orchestrate) 4 reason -> 4 classes
-> StoreLogger (single responsibility of implementing caching)
-> StoreCache
-> FileStore
