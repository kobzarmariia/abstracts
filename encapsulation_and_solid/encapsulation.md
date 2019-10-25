# Encapsulation

Most code suck.
Write for ignorand (stupid) programmers.
Code is READ more than written.

BAD example (public API)
Which method are commands and which are queries?

```
public class FileStore
{
  public string WorkingDirectory {get; set;}

  public string Save(int id, string message) //why return string (what string contain) -> look on the sourse code
  {
    var path = Path.Combine(this.WorkingDirectory, id = ".txt");
    File.WriteAllText(path, message);
    return path;
  }

  public event EventHandler<MessageEventArgs> MessageRead;

  public void Read(int id) //why return void -> look on the sourse code. Read methot is it query?
  {
    var path = Path.Combine(this.WorkingDirectory, id + ".txt");
    var msg = File.ReadAllText(path);
    this.MessageRead(this, new MessageEventArgs { Message = msg });
    //return msg, but mutate (don`t rise the event)
  }
}
```

## Classic Object Oriented definition

### Information hiding

Missconseption: private, {get; set;}

Hiding not information, hiding - implementation details!

Invalid states are impossible! (protection of invariants)

### Beyong OO:

#### Command query separation CQS

(not - CQRS command-query responsibility segregation)

Commands or queries but not both!

##### Commands - have side effect.

- mutate state
- return void

```
void Save(Order order)

void Send(T message)

void Associate(IFoo foo, Bar bar)
```

##### Queries - return data

- do not mutate observable state
- return smth
- idempotent - when applying the operation to the object again gives the same result as the first
- safe to invoke (don't worry it invoke again)

Query from command it is OK!

```
Order[] GetOrders(int userId); //return all orders by id

IFoo Map(Bar bar); //translate information to different format

T Create();
```

Refactoring.

```
public class FileStore
{
  public string WorkingDirectory {get; set;}

  public void Save(int id, string message) //command
  {
    var path = GetFileName(id); //ok to query from command
    File.WriteAllText(path, message);
  }

  public string Read(int id) //query
  {
    var path = GetFileName(id);
    var msg = File.ReadAllText(path);
    return msg;
  }

  public string GetFileName(int id) //query
  {
    return Path.Combine(this.WorkingDirectory, id = ".txt");
  }
}
```

#### Postel's law (robustness principle)

How can you trust that a Command accepts your input?
How can you trust that a Query to return a useful response?

Be conservative in what you sent.
Be liberal in what you accept.

Returning null - bad decision.

Refactoring.

```
public class FileStore
{
  public FileStore(string workingDirectory) //input
  {
    if (workingDirectory == null)
      throw new ArgumentNullExeption("workingDirectory");
    if (!Directory.Exists(workingDirectory))
      throw new ArgumentException("Boo", "workingDirectory")

    this.WorkingDirectory = workingDirectory;
  }

  public string WorkingDirectory {get; private set;} //is require

  public void Save(int id, string message) //command
  {
    var path = GetFileName(id); //ok to query from command
    File.WriteAllText(path, message);
  }

  public bool Exists(int id) //tester
  {
    var path = this.GetFileName(id);
    return File.Exists(path);
  }

  public string Read(int id) //query, can return null. Can guarantee that this method always return the string. Do
  {
    var path = GetFileName(id); //but if file does not exist
    if (!File.Exists(path))
      throw new ArgumentExeption("You suck!", "id")
    var msg = File.ReadAllText(path);
    return msg;
  }

  public string GetFileName(int id) //query, never returm null.
  {
    return Path.Combine(this.WorkingDirectory, id = ".txt");
  }
}
```

Value Type - nullable, non-nullable
Reference Type - nullable

I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement.
This has led to innumerable errors, vulnerabilities, and system crashes... (Tony Hoare)

```
string message = "";
try
{
  message = fileStore.Read(49);
}
catch (ArgumentException)
{

}
```

Tester/Doer

```
string message = "";
if (fileStore.Exists(49))
  message = fileStore.Read(49);
```

Try read

```
public class FileStore
{
  public FileStore(string workingDirectory) //input
  {
    if (workingDirectory == null)
      throw new ArgumentNullExeption("workingDirectory");
    if (!Directory.Exists(workingDirectory))
      throw new ArgumentException("Boo", "workingDirectory")

    this.WorkingDirectory = workingDirectory;
  }

  public string WorkingDirectory {get; private set;} //is require

  public void Save(int id, string message) //command
  {
    var path = GetFileName(id); //ok to query from command
    File.WriteAllText(path, message);
  }

  public bool TryRead(int id, out string message)
  {
    message = null;
    var path = GetFileName(id); //but if file does not exist
    if (!File.Exists(path))
      return false;
    message = File.ReadAllText(path);
    return true;
  }

  public string GetFileName(int id) //query, never returm null.
  {
    return Path.Combine(this.WorkingDirectory, id = ".txt");
  }
}
```

Public

```
string message = "";
bool exists = fileStore.TryRead(49, out message);
```

Maybe

```
public class FileStore
{
  public FileStore(string workingDirectory);

  public string WorkingDirectory {get;}

  public void Save(int id, string message)

  public IEnumerable<string> Read(int id)
  {
    var path = GetFileName(id);
    if (!File.Exists(path))
      return new string[0]; //empty string array
    var msg = File.ReadAllText(path);
    return new[] { message }; //array with one element
  }

  public string GetFileName(int id)
}
```

```
public class Maybe<T> : IEnumerable<T>
{
  private readonly IEnumerable<T> values;

  public Maybe()
  {
    this.values = new T[0];
  }

  public Maybe(T value)
  {
    this.values = new[] {value};
  }

  public IEnumerator<T> GetEnumerator()
  {
    return this.values.GetEnumerator();
  }

  IEnumerator IEnumerable.GetEnumerator()
  {
    return this.GetEnumerator();
  }
}
```

```
public class FileStore
{
  public FileStore(string workingDirectory);

  public string WorkingDirectory {get;}

  public void Save(int id, string message)

  public Maybe<string> Read(int id)
  {
    var path = GetFileName(id);
    if (!File.Exists(path))
      return new Maybe<string>();
    var msg = File.ReadAllText(path);
    return new Maybe<string>(message);
  }

  public string GetFileName(int id)
}

var message = fileStore.Read(49).DefaultIfEmpty("").Single();
```
