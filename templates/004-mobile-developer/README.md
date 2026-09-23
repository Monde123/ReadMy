<!-- READMY_TEMPLATE: 004-mobile-developer -->
<div align="center">

# Taylor Morgan
### Staff Mobile Engineer • Native iOS (Swift) & Android (Kotlin)

Crafting high-fidelity, 120Hz native mobile applications with offline-first local synchronization, sub-100ms cold boots, and fluid gesture physics.

<p>
  <img src="https://img.shields.io/badge/App_Store-4.9_★_(84k_Reviews)-007AFF?style=flat-square&logo=apple&logoColor=white" alt="App Store" />
  <img src="https://img.shields.io/badge/Google_Play-4.8_★_(120k_Reviews)-34A853?style=flat-square&logo=googleplay&logoColor=white" alt="Google Play" />
  <img src="https://img.shields.io/badge/Crash--Free_Users-99.94%25-059669?style=flat-square" alt="Crash-Free" />
  <img src="https://img.shields.io/badge/Active_Devices-3.4M+_MAU-1e293b?style=flat-square" alt="MAU" />
</p>

</div>

---

## 📱 Shipped Flagship Mobile Applications

<table width="100%">
  <tr>
    <!-- iOS FLAGSHIP -->
    <td width="50%" valign="top">
      <div align="center">
        <h3>🍎 PulseFlow Health & Vitals</h3>
        <p><em>Native iOS Application • Apple HealthKit & Background Sync</em></p>
      </div>
      <pre><code>┌─────────────────────────┐
│ 09:41           📶 🔋 98%│
│ PULSEFLOW       [LIVE]  │
│ ─────────────────────── │
│ Resting HR      58 BPM  │
│ HRV (SDNN)      74 ms   │
│ Sleep Quality   94%     │
│ ─────────────────────── │
│ [=== ECG WAVEFORM ====] │
│ ─────────────────────── │
│ [ ⚡ Export Apple Care ]│
└─────────────────────────┘</code></pre>
      <ul>
        <li><strong>Architecture:</strong> SwiftUI + Composable Architecture (TCA).</li>
        <li><strong>HealthKit Integration:</strong> Real-time background query observer processing ECG arrhythmia alerts.</li>
        <li><strong>Cold Launch:</strong> 180ms startup time via dynamic framework pruning.</li>
      </ul>
      <p align="center">
        <img src="https://img.shields.io/badge/iOS-17.0+-000000?style=flat-square&logo=apple&logoColor=white" alt="iOS" />
        <img src="https://img.shields.io/badge/Swift-5.10-F05138?style=flat-square&logo=swift&logoColor=white" alt="Swift" />
        <a href="https://apple.com"><strong>App Store Link ↗</strong></a>
      </p>
    </td>

    <!-- ANDROID FLAGSHIP -->
    <td width="50%" valign="top">
      <div align="center">
        <h3>🤖 OmniPay Merchant Terminal</h3>
        <p><em>Native Android Application • NFC Tap-to-Pay & Hardware POS</em></p>
      </div>
      <pre><code>┌─────────────────────────┐
│ 14:32           📶 🔋 85%│
│ OMNIPAY POS   MERCHANT  │
│ ─────────────────────── │
│ Total Due       €142.50 │
│ Status: READY FOR CARD  │
│ ((( TAP PHONE / CARD )))│
│ ─────────────────────── │
│ [✓] EMV L2 Certified    │
│ ─────────────────────── │
│ [ Print Thermal Slip ]  │
└─────────────────────────┘</code></pre>
      <ul>
        <li><strong>Architecture:</strong> Jetpack Compose + Clean MVI + Kotlin Coroutines.</li>
        <li><strong>EMV Kernel:</strong> Direct APDU NFC card communication certified for PCI-CPOC contactless payments.</li>
        <li><strong>Crash Rate:</strong> 0.02% across 800+ heterogeneous Android OEM devices.</li>
      </ul>
      <p align="center">
        <img src="https://img.shields.io/badge/Android-API_34-34A853?style=flat-square&logo=android&logoColor=white" alt="Android" />
        <img src="https://img.shields.io/badge/Kotlin-2.0-7F52FF?style=flat-square&logo=kotlin&logoColor=white" alt="Kotlin" />
        <a href="https://play.google.com"><strong>Google Play Link ↗</strong></a>
      </p>
    </td>
  </tr>
</table>

---

## 🛠️ Mobile Architecture & Performance Benchmarks

| Capability Domain | iOS Stack | Android Stack | Performance Invariant |
| :--- | :--- | :--- | :--- |
| **Declarative UI** | `SwiftUI`, `Combine`, `UIKit` (custom layer) | `Jetpack Compose`, `Material 3` | 120 FPS ProMotion / smooth scroll with zero jank |
| **Local Persistence** | `CoreData`, `SwiftData`, `GRDB (SQLite)` | `Room DB`, `SQLDelight`, `DataStore` | Encrypted SQLCipher at rest, sub-2ms query execution |
| **Networking & Sync** | `URLSession`, `gRPC-Swift`, `WebSockets` | `Ktor Client`, `OkHttp`, `Wire gRPC` | Offline mutation queue with exponential retry backoff |
| **CI/CD & Testing** | `Fastlane`, `Xcode Cloud`, `XCTest` | `Fastlane`, `GitHub Actions`, `Robolectric`| Automated screenshot regression testing & TestFlight builds |

---

## 🚀 Mobile Delivery Pipeline & Tooling

```text
Commit to Main 
    ├── [Fastlane Match]: Cryptographic profile & cert provisioning
    ├── [Static Analysis]: SwiftLint + Detekt + MobSF security scan
    ├── [Matrix Tests]: 16 simulated device resolutions (iOS & Android)
    └── [Store Upload]: Automated submission to TestFlight & Google Play Internal
```

---

<div align="center">

### 📲 Mobile Consultation & Beta Inquiries

[TestFlight Public Beta](https://testflight.apple.com) • [Google Play Beta](https://play.google.com) • [GitHub](https://github.com/example-user) • [Email Taylor](mailto:taylor@mobile-systems.dev)

<sub>Designing fluid mobile experiences that feel like physical hardware.</sub>

</div>
