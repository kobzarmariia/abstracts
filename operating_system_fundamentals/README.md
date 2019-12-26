# Operating System Fundamentals

Solid understanding of OS architecture and capabilities (primarily the concepts of resources / resource management, input/output and user interaction).

Computer System - Hardware (physical part) and Software (programs)

Software (instructions): 
- System Software (Windows)
- Application Software (Photoshop)

Hardware - OS - User - Application Programs

Operating System (OS) - is a program that manages the computer hardware (Resourses like CPU, Memory, I/O Devices).
It also providers a basis for application programs(performs spesific tasks) and acts as an intermediary between computer User and computer Hardware.

OS - the whole package that manages our computers resources and lets us interact with it.

1. Kernel space - to - Hardrive
- Process Manager 
- Memory Manager 
- File Manager 
- I/O Manager 

Process management - manage the order they run in, how many resources they take up, how long they run. (multitasking)
Our kernel optimizes memory usage and make sure our applications have enough memory to run.
I/O management and file management.

2. User space 
- Applications

Hardware: 
- Central Proccesing Unit (CPU) - recieves and executes instructions
- Main Memory - holds instructions that are about to be processed 
- Secondary Storage - hard drive, DVD...
- I/O devices

Processes are programs that are running. When processes are run, they take up hardware resources like CPU and RAM. 
But, sometimes this isn't enough, sometimes a process is taking more resources than it's supposed to.
Background processes - Daemon processes
Threads - in each processes. 


Task kill - by process ID. (taskkill /pid 5856, tasklist)

In Linux processes have a parent child relationship

(Task Manager or Activity Monitor)

Von Neumann Architecture: 

The term "von Neumann architecture" has evolved to mean any stored-program computer in which an instruction fetch and a data operation cannot occur at the same time because they share a common bus. This is referred to as the von Neumann bottleneck and often limits the performance of the system.

![Von Neumann Architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture#/media/File:Von_Neumann_Architecture.svg)

Like: Windows, Linux(Ubuntu, Debian, and Red Hat), Ubuntu, Mac OS X iOS, Android.

 A "quad-core" processor has 4 print-outs of the same circuitry.

 Main Memory (RAM - Random Access Memory) - Volatile (stored information will be lots without a constant flow of electricity)
 Secondary Storage - non-volatile memory (hard drive, DVD, flash...)

 ROM - read-only memory 

 ## Computer Organization Levels

**Black Box Level**
Two groups of computer connections with external (by relation to it) environment:
  ◦ communication with local peripheral equipment
- external input devices (input WU) and
output (output WU);
  ◦ communications for transferring data to a large distance.

**The level of "general architecture"**
CPU - Central Processing Unit. Manages the functioning of the entire system and performs data processing functions.
MM is the main memory. Stores raw data and all the information necessary for their processing.
I/O Module - input-output module. Moves data between the computer and the environment
Wednesday in both directions.
System internal communications (buses) - a means of exchanging data between the main components.

**The level of "CPU architecture"**
CD - control device. Implements functions
controlling other CPU components and everything
by computer.
ALU is an arithmetic-logical device.
Performs all operations related to
meaningful data processing (integers, logical data).
Block of processing numbers in floating point format.
Registers store operational information during execution by the processor of the current
operations.
Tires provide collaboration for the rest CPU components.

