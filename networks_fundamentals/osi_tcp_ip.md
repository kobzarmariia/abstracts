# OSI & TCP/IP

![OSIvsTCP/IP](https://www.researchgate.net/publication/327483011/figure/fig2/AS:668030367436802@1536282259885/The-logical-mapping-between-OSI-basic-reference-model-and-the-TCP-IP-stack.jpg)

## OSI

**OSI** - Open Systems Interconnection, Adopted as International Standard Organization for Standardization (ISO) in 1983.
An open system is a system built in compliance with open specifications. 
-> Ability to build a network using equipment from different manufacturers.

The OSI model describes:
  • Seven levels of networking
  • Appointment of each level -> Protocols are described in separate standards.
Not a network architecture!

1. **Physical level (bit)**

Network hardware - hub

Physical transmission of bits
Does not understand the meaning of the transmitted information
Task: How to present bits of information in the form signals transmitted over the medium

Communication channel characteristics
  • Bandwidth (bit / s)
  • Delay
  • Number of mistakes
Types of communication channels
  • Simplex, duplex, half duplex

Communication media: 
Cable
  • Telephone cable (“noodle”)
  • Coaxial cable
  • Twisted pair
  • Optical cable
  • 220V power wires
Wireless technology
  • Radio waves
  • Infrared radiation
Satellite channels
Wireless Optics (Lasers)

2. **Channel level (Frame)**

Network hardware - Switch point access

Messaging through a communication channel
  • Definition of the beginning / end of a message in a bit stream
Error Detection and Correction
In a broadcast network:
  • Media access control
  • Physical Addressing

3. **Network layer (Package)**

Network hardware - Router

Unites networks built on the basis of different
technology
Tasks:
  • Creating a composite network, reconciling differences in networks
  • Addressing (network or global addresses)
  • Determining the packet forwarding route to composite network (routing)

4. **Transport level (Segment / Datagram)**

Provides data transfer between host processes
Reliability Management:
  • May provide higher reliability than the network
  • Most popular service - protected from errors channel with guaranteed order following messages
Through level
  • Messages are delivered from the source to the addressee
  • The previous levels use the link principle chains

5. **Session level (Message)**

Allows you to establish communication sessions
Tasks:
  • Dialog management (transmission order posts)
  • Marker management (prevention simultaneous critical operation)
  • Synchronization (tags in messages for resuming transmission in case of failure)

6. **Presentation level (Message)**

Provides syntax matching and semantics of transmitted data
  • Character representation formats
  • Number Formats
Encryption and decryption
Example:
  • Transport Layer Security (TLS) / Secure Sockets Layer (SSL)

7. **Application level (Message)**

A set of applications useful to users:
  • Hypertext Web Pages
  • Social networks
  • Video and audio communication
  • Email
  • Access to shared files
  • and much more

![OSI](https://miro.medium.com/max/1420/0*9oXXYqWSMNY4y02_.png)

## TCP/IP

Reference Networking Models:
  • What levels should be online
  • What functions should be performed at each level
TCP / IP Model
  • The de facto standard based on the stack TCP / IP protocols
  • The TCP / IP model describes how to build networks on based on different technologies so that the stack works in them
  TCP / IP
  • 4 layers (5 OSI + TCP / IP layers)
  
TCP/IP Protocol Stack
  • The most popular protocol suite
  • The basis of the Internet

1. **Network interfaces**

Ethernet, Wi-Fi, DSL (ARP, DHCP)

2. **Network**

IP, ICMP

3. **Transport**

TCP, UDP

4. **Applied**

HTTP, SMTP, DNS, FTP,

The Internet protocol suite is the conceptual model and set of communications protocols used in the Internet and similar computer networks. It is commonly known as TCP/IP because the foundational protocols in the suite are the Transmission Control Protocol (TCP) and the Internet Protocol (IP). 




