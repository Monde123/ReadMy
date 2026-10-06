<!-- READMY_TEMPLATE: 008-robotics-stem -->
<div align="center">

```text
====================================================================================================
 [⚙️] AUTONOMOUS ROBOTICS & EMBEDDED SYSTEMS LAB // HARDWARE SPECIFICATION SHEET
====================================================================================================
```

# Dr. Liam O'Connor
### Robotics Systems Engineer • Embedded Firmware & Motion Control

Developing autonomous ground vehicles (AGVs), real-time ROS2 control loops, and low-latency embedded firmware.

<p>
  <img src="https://img.shields.io/badge/ROS2-Jazzy_Jalisco-22314E?style=flat-square&logo=ros&logoColor=white" alt="ROS2" />
  <img src="https://img.shields.io/badge/Firmware-FreeRTOS_•_Zephyr-black?style=flat-square&logo=cplusplus&logoColor=white" alt="Firmware" />
  <img src="https://img.shields.io/badge/Bus-CAN_FD_•_EtherCAT-d97706?style=flat-square" alt="Bus" />
  <img src="https://img.shields.io/badge/Hardware-NVIDIA_Jetson_Orin-76B900?style=flat-square&logo=nvidia&logoColor=white" alt="Jetson" />
</p>

</div>

---

## 🤖 Real-Time Perception & Motion Control Pipeline

```text
[ LiDAR (Ouster OS1) ]      [ Stereo Vision (ZED 2i) ]      [ IMU (9-DOF) ]
           │                            │                          │
           └────────────────────────────┼──────────────────────────┘
                                        ▼ (ROS2 Cyclone DDS, 100 Hz)
┌────────────────────────────────────────────────────────────────────────┐
│  PERCEPTION & SLAM NODE : Fast-LIO2 (LiDAR-Inertial Odometry)          │
│  Hardware: NVIDIA Jetson AGX Orin (64GB) • TensorRT FP16 Acceleration  │
└────────────────────────────────────────────────────────────────────────┘
                                        │ (Estimated Pose ± 1.2cm)
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│  NAVIGATION & TRAJECTORY : Nav2 MPPI Controller + Dynamic Costmaps     │
└────────────────────────────────────────────────────────────────────────┘
                                        │ (Twist Velocity Commands)
                                        ▼ (Isolated CAN FD Bus, 1 Mbps)
┌────────────────────────────────────────────────────────────────────────┐
│  MOTOR CONTROLLER EMBEDDED NODE : Dual STM32H7 (480 MHz ARM Cortex-M7) │
│  Real-Time Loop: Field-Oriented Control (FOC) @ 20 kHz PWM             │
└────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
                         [ Brushless DC Servos & Encoders ]
```

---

## 🔩 Hardware Bill of Materials (BOM) & System Specs

| Subsystem | Components & Hardware | Protocol / Bus | Engineering Specs |
| :--- | :--- | :--- | :--- |
| **Compute Core** | NVIDIA Jetson AGX Orin 64GB | PCIe Gen4, Gigabit Ethernet | 275 TOPS AI compute, Linux Real-Time PREEMPT_RT kernel |
| **Microcontrollers** | 2x STM32H743ZI Cortex-M7 | CAN FD, SPI (50 MHz) | Hardware floating-point, FreeRTOS deterministic task scheduler |
| **Sensor Suite** | Ouster OS1-32 Rev 7 LiDAR + IMU | UDP / PTP IEEE 1588 | 32 beams, 120m range, sub-microsecond time synchronization |
| **Actuation** | 4x Nanotec 400W BLDC Motors | Differential Drive | Planetary gearbox (15:1), magnetic absolute encoders |
| **Power Distribution**| 48V 30Ah LiFePO4 Battery Pack | BMS via SMBus / I2C | 8-hour autonomous runtime, active thermal management |

---

## 🚀 Robotics Platforms & Open-Source Firmware

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🚜 <a href="#agv-vanguard">Vanguard AGV Autonomous Base</a></h3>
      <p><em>Industrial omnidirectional mobile platform designed for warehouse logistics.</em></p>
      <ul>
        <li>Payload capacity up to 250 kg with active suspension.</li>
        <li>Sub-2cm localization accuracy via sensor-fused LiDAR SLAM.</li>
        <li>ISO 13849 Category 3 safety system with dual emergency stop loops.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/C++20-00599C?style=flat-square&logo=c%2B%2B&logoColor=white" alt="C++" />
        <img src="https://img.shields.io/badge/CAD-Onshape-orange?style=flat-square" alt="CAD" />
        <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>⚡ <a href="#motor-firmware">MicroFOC Embedded Controller</a></h3>
      <p><em>Open-source Field Oriented Control (FOC) firmware for STM32 microcontrollers.</em></p>
      <ul>
        <li>Zero-latency space vector PWM with inline current sensing.</li>
        <li>Full position, velocity, and torque closed-loop PID control.</li>
        <li>Integrated telemetry GUI with real-time step response plotting.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/PlatformIO-orange?style=flat-square" alt="PlatformIO" />
        <img src="https://img.shields.io/badge/RTOS-FreeRTOS-blue?style=flat-square" alt="FreeRTOS" />
        <img src="https://img.shields.io/badge/Stars-1.5K-yellow?style=flat-square" alt="Stars" />
      </p>
    </td>
  </tr>
</table>

---

## 📑 Safety Standards & Compliance

- **ISO 13849-1:** Functional safety of machinery and safety-related control circuits.
- **IEC 61508:** Systematic capability in embedded firmware architecture.
- **MISRA C++:2023:** Static code analysis enforced on all bare-metal microcontroller firmware.

---

<div align="center">

### 📡 Lab Direct Line & Hardware Collaboration

[Hardware Repositories](https://github.com/example-user) • [CAD Models](https://cad.example.com) • [Research Papers](https://scholar.google.com) • [Email Liam](mailto:liam@robotics-lab.org)

<sub>Designed and prototyped with physical precision. 0% simulated, 100% bench tested.</sub>

</div>
