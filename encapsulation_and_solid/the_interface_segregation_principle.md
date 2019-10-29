# Interface segregation principle ISP

How interface should be design

Granularity (lots of small(simple) classes or one big?)
Unit bias

Clients should not be forced to depend on methods they do not use.

Favour role interfaces over header interfaces.

Can help address LSP issues. Using ISP to resolve LSP problems.

You can add features. (create smth bigger)

IStore

```
public interface IStore
{
  void WriteAllText(int id, stirng message); // string path -> int id

  Maybe<string> ReadAllText(int id); //path -> id, string -> Maybe<string>

  //FileInfo GetFileInfo(int id);
}
```

SqlStore

```
public class SqlStore : IStore
{
 public void WriteAllText(string path, string message)
 {
   //Write to DB here
 }

 public Maybe<string> ReadAllText(string path)
 {
   //Read and return from DB
 }

/* DELETE
public FileInfo GetFileInfo(int id)
 {
    throw new NotSupportedException();
  }
*/
}
```

IFileLocator

```
public interface IFileLocator
{
  FileInfo GetFileInfo(int id);
}
```

in MessageStore

```
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
    return this.FileLocator.GetFileInfo(id); //change Store -> FileLocator
  }
```

# Refactoring with ISP

in MessageStore

```
  public void Save(int id, string message)
  {
    this.Log.Saving(id, message);    //commands, add message
    this.Store.WriteAllText(id, message); //pass message
    this.Cache.AddOrUpdate(id, message);
    this.Log.Saved(id, message);  //commands, add message
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
    return this.FileLocator.GetFileInfo(id); //change Store -> FileLocator
  }
```

IStoreLogger

```
public interface IStoreLogger {
  void Saving(int id, string message); //add string message

  void Saved(int id, string message);

  void Reading(int id);

  void DidNotFind(int id);

  void Returning(int id);
}
```

IStore

```
public interface IStore
{
void Save(int id, string message);

//void WriteAllText(int id, string message);

Maybe<string> ReadAllText(int id);
}
```

IStoreCache

```
public interface IStoreCache
{
void Save(int id, string message);

//void AddOrUpdate(int id, string message);

Maybe<string> GetOrAdd(int id, Func<int, Maybe<string>> messageFactory);
}
```

Than

```
  public void Save(int id, string message)
  {
    this.Log.Saving(id, message);    //commands, add message
    this.Store.Save(id, message); //pass message
    this.Cache.Save(id, message);
    this.Log.Saved(id, message);  //commands, add message
  }
```

IStoreWriter

```
public interface IStoreWriter {
    void Save(int id, string message);
}
```

LogSavingStoreWriter

```
public class LogSavingStoreWriter : IStoreWriter
{
    public void Save(int id, string message)
    {
        Log.Information("Saving message {id}.", id);
    }
}
```

LogSavedStoreWriter

```
public class LogSavedStoreWriter : IStoreWriter
{
    public void Save(int id, string message)
    {
        Log.Information("Saved message {id}.", id);
    }
}
```

Than

```
public void Save(int id, string message)
{
  new LogSavingStoreWriter().Save(id, message);
  this.Store.Save(id, message);
  this.Cache.Save(id, message);
  new LogSavedStoreWriter().Save(id, message);
}
```
