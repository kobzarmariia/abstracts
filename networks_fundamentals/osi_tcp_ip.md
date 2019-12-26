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

Network hardware - Switch, point access (hub - Ethernet) 

1982 IEEE 802.3 project created for Ethernet standardization

**Ethernet**

Classic Ethernet:
  • Shared environment
  • Ethernet - Gigabit Ethernet

Switched Ethernet:
  • Point to point
  • Appeared in Fast Ethernet
  • The only option in 10G Ethernet and higher

Ethernet technology evolution:
• Ethernet (10 Mb / s), Fast Ethernet (100 Mb / s), Gigabit Ethernet, 5G Ethernet, 10G Ethernet, 100G Ethernet
 
Messaging through a communication channel
  • Definition of the beginning / end of a message in a bit stream
Error Detection and Correction

In a broadcast network:
  • Media access control
  • Physical Addressing

Logical channel control sub-layer (Logical Link Control, LLC)
Media Access Control Sublayer (Media Access Control, MAC) 

**MAC addresses** - used to identify network interfaces network nodes.
The form of writing is six hexadecimal numbers: 
  • 1C-75-08-D2-49-45
  • 1C:75:08:D2:49:45

Individual (unicast):
  • 30-9C-23-15-E8-8C
Group (multicast, first bit of high byte Address is 1):
  • 01-80-C2-00-00-08
Broadcast:
  • FF-FF-FF-FF-FF-FF

MAC Address Assignment
  • Automatic manufacturer of network adapters
  • Manual

**Classic Ethernet**
  • Shared environment
  • Topology common bus
Collisions occur during data transfer multiple computers at the same time CSMA/CD Media Access Method
Disadvantages of Classic Ethernet
  • Poor scalability
  • Low security
Solution of problems
  • Switched Ethernet

**Wi-Fi** - The Dominant Wireless Technology data transmission in computer networks Wi-Fi Physical Layer
• 6 IEEE 802.11 standards
Lack of acknowledgment of receipt of a frame!
CSMA/CA - Multiple Access with listening to the carrier frequency with collision avoidance

3. **Network layer (Package)**

Network hardware - Router
Ethernet, Wi-Fi, 5G / 4G / 3G, MPLS, (ATM, TokenRing, FDDI - outdated)

Converting Global Addresses to local (**ARP** for TCP / IP)

**IP** - global addresses used in the protocol stack TCP/IP

• IPv4 address 4 bytes - 4 decimal numbers 0-255, separated by periods 213.180.193.1
• IPv6: address 16 bytes 

Structure example:
• IP address: 213.180.193.3
• Subnet Number: 213.180.193.0
• Host Number: 3 (0.0.0.3)

**DHCP** - Dynamic Host Configuration Protocol - Allows you to assign IP addresses to computers on a network
automatically

The process of obtaining an IP address
• DORA - DISCOVER OFFER REQUEST ACK 
The address is issued for a limited period (rental)

**ICMP** - Internet Control Message Protocol - Network Level Error Reporting, Network Health Testing (ping, traceroute)

Unites networks built on the basis of different
technology
Tasks:
  • Creating a composite network, reconciling differences in networks
  • Addressing (network or global addresses)
  • Determining the packet forwarding route to composite network (routing)

4. **Transport level (Segment / Datagram) data delivery guarantee**

Network independent



**TCP** - User Datagram Protocol - **reliable** byte stream transmission (Guaranteed data delivery and order following)
 
**UDP** - Transmition Control Protocol - reliability of delivery compared to IP no increases (does not guaranteed data delivery BUT faster)

Provides data transfer between host processes (directly)

**Socket interface** to application.

Address (**port**): number from 1 to 65535. Each network application on host has its own port (where to send the received package)
192.168.1.3:80 (IP + port)

Well known ports: 1 - 1024 80 - HTTP (web 88 8080) 25 - SMTP 53 - DNS 67,68 - DHCP (only administrator can use)
Registered Ports: 1025 - 49151 Online Registration (IANA) Internet Assigned Numbers Authority (browser - port 50298)
(web-server Demon - Port 80)
Dynamic ports: 49152 - 65535 Automatically assigned by the operating system to network applications

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

**DNS** - Domain Name System

**HTTP** - HyperText Transfer Protocol

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




