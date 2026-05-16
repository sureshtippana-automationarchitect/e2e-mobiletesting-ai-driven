# Framework Architecture Diagrams

This document contains visual representations of the mobile testing framework architecture.

## 📐 Architecture Overview

```mermaid
graph TB
    subgraph "Test Layer"
        T[Test Files<br/>sgalert-complete-flow-pom.spec.ts]
    end
    
    subgraph "Page Object Layer"
        P[SGAlertPage<br/>- Element Getters<br/>- Action Methods<br/>- Flow Methods]
        B[BasePage<br/>- Initializes Helper<br/>- Provides Access]
    end
    
    subgraph "Helper Layer"
        H[HelperMethods<br/>- Element Interactions<br/>- Validations<br/>- Mobile Gestures<br/>- App Lifecycle]
    end
    
    subgraph "Framework Layer"
        MW[MobileWright<br/>Device, Screen]
    end
    
    T -->|creates| P
    P -->|extends| B
    P -->|uses| H
    B -->|initializes| H
    H -->|interacts with| MW
    T -->|provides| MW

    style T fill:#e1f5ff
    style P fill:#fff4e1
    style B fill:#fff4e1
    style H fill:#e8f5e9
    style MW fill:#f3e5f5
```

## 🏗️ Class Relationships

```mermaid
classDiagram
    class BasePage {
        #screen: any
        #device: any
        #helper: HelperMethods
        +constructor(screen, device)
        +getHelperMethods(): HelperMethods
        #getScreen(): any
        #getDevice(): any
    }
    
    class HelperMethods {
        -screen: any
        -device: any
        -defaultTimeout: number
        +tapElement(locator, message)
        +fillInput(locator, value, message)
        +validate(locator, message)
        +swipe(direction, duration)
        +takeScreenshot(description)
        +launchApp(packageName)
        +terminateApp(packageName)
        +wait(milliseconds)
    }
    
    class SGAlertPage {
        -APP_PACKAGE: string
        +sgAlertPageElements: getter
        +launchAppFresh()
        +verifyWelcomeScreen()
        +clickNextOnWelcome()
        +clickSkipOnWelcome()
        +verifyPermissionsScreen()
        +acceptTermsOfUse()
        +clickGetStarted()
        +completeOnboardingFlow()
    }
    
    BasePage o-- HelperMethods : contains
    SGAlertPage --|> BasePage : extends
    SGAlertPage ..> HelperMethods : uses via this.helper

    style BasePage fill:#fff4e1
    style HelperMethods fill:#e8f5e9
    style SGAlertPage fill:#e1f5ff
```

## 🔄 Method Call Flow

```mermaid
sequenceDiagram
    participant Test
    participant SGAlertPage
    participant BasePage
    participant HelperMethods
    participant MobileWright

    Test->>SGAlertPage: new SGAlertPage(screen, device)
    SGAlertPage->>BasePage: super(screen, device)
    BasePage->>HelperMethods: new HelperMethods(screen, device)
    
    Note over Test,MobileWright: Action Method Call
    
    Test->>SGAlertPage: clickNextOnWelcome()
    SGAlertPage->>SGAlertPage: get sgAlertPageElements.nextButton
    SGAlertPage->>HelperMethods: this.helper.tapElement(element, message)
    HelperMethods->>HelperMethods: waitForElementToBeVisible(element)
    HelperMethods->>MobileWright: element.tap()
    HelperMethods-->>SGAlertPage: log message
    SGAlertPage->>HelperMethods: this.helper.wait(5000)
    HelperMethods-->>Test: action complete
```

## 📊 Element Getter Pattern

```mermaid
graph LR
    subgraph "Page Object"
        G[Element Getter<br/>public get elements]
    end
    
    subgraph "Helper"
        H[HelperMethods<br/>getElementByText]
    end
    
    subgraph "Framework"
        S[Screen<br/>getByText]
    end
    
    A[Access Element] -->|call| G
    G -->|uses| H
    H -->|calls| S
    S -->|returns| L[Locator<br/>always fresh]
    
    style G fill:#fff4e1
    style H fill:#e8f5e9
    style S fill:#f3e5f5
    style L fill:#e1f5ff
```

## 🎯 Pattern Comparison

### Old Pattern Flow
```mermaid
graph TD
    A[Test] -->|creates| B[SGAlertPage]
    B -->|extends| C[BasePage with all methods]
    B -->|accesses| D[private readonly locators]
    B -->|calls| E[this.tap, this.type, etc.]
    C -->|provides| E
    E -->|interacts with| F[Screen/Device]
    
    style B fill:#ffcccc
    style C fill:#ffcccc
    style D fill:#ffcccc
    style E fill:#ffcccc
```

### New Pattern Flow
```mermaid
graph TD
    A[Test] -->|creates| B[SGAlertPage]
    B -->|extends| C[BasePage<br/>minimal]
    B -->|accesses| D[public get elements<br/>always fresh]
    B -->|calls| E[this.helper.method]
    C -->|initializes| F[HelperMethods]
    E -->|delegates to| F
    F -->|interacts with| G[Screen/Device]
    
    style B fill:#ccffcc
    style C fill:#ccffcc
    style D fill:#ccffcc
    style E fill:#ccffcc
    style F fill:#ccffcc
```

## 🚀 Test Execution Flow

```mermaid
graph TD
    Start([Test Starts]) --> Init[Initialize SGAlertPage]
    Init --> Flow[Call Flow Method<br/>completeOnboardingFlow]
    Flow --> Launch[Launch App<br/>helper.launchApp]
    Launch --> Verify1[Verify Screen<br/>helper.validate]
    Verify1 --> Action1[Click Next<br/>helper.tapElement]
    Action1 --> Wait1[Wait<br/>helper.wait]
    Wait1 --> Verify2[Verify Next Screen<br/>helper.validate]
    Verify2 --> More{More Steps?}
    More -->|Yes| Action2[Continue Flow]
    More -->|No| Screenshot[Take Screenshot<br/>helper.takeScreenshot]
    Action2 --> Wait1
    Screenshot --> End([Test Completes])
    
    style Launch fill:#e1f5ff
    style Verify1 fill:#fff4e1
    style Action1 fill:#e8f5e9
    style Wait1 fill:#f3e5f5
```

## 📦 File Structure

```mermaid
graph TD
    Root[e2e-mobiletesting-ai-driven/]
    
    Root --> Helpers[helpers/]
    Root --> Pages[pages/]
    Root --> Tests[tests/]
    Root --> Docs[Documentation Files]
    
    Helpers --> HM[HelperMethods.ts]
    Helpers --> HI[index.ts]
    Helpers --> HR[README.md]
    
    Pages --> BP[BasePage.ts]
    Pages --> SP[SGAlertPage.ts]
    Pages --> PI[index.ts]
    Pages --> PR[README.md]
    
    Tests --> T1[sgalert-complete-flow.spec.ts]
    Tests --> T2[sgalert-complete-flow-pom.spec.ts]
    
    Docs --> D1[REFACTORING-SUMMARY.md]
    Docs --> D2[PATTERN-COMPARISON.md]
    Docs --> D3[ARCHITECTURE-DIAGRAMS.md]
    
    style Helpers fill:#e8f5e9
    style Pages fill:#fff4e1
    style Tests fill:#e1f5ff
    style Docs fill:#f3e5f5
```

## 💡 Benefits Visualization

```mermaid
mindmap
  root((New Pattern<br/>Benefits))
    Maintainability
      Single Responsibility
      Easy to Find Code
      Simple Updates
    Reusability
      Use Anywhere
      Not Tied to Inheritance
      Shared Helpers
    Consistency
      Matches Web Framework
      Industry Standards
      Team Knowledge
    Scalability
      Add New Pages Easily
      Add New Helpers Easily
      Proven Pattern
    Type Safety
      Explicit Types
      Better Autocomplete
      Compile-time Checks
```

## 🔍 Debugging Flow

```mermaid
graph LR
    A[Test Fails] --> B{Which Layer?}
    B -->|Test Logic| C[Check Test File]
    B -->|Page Method| D[Check Page Object]
    B -->|Helper| E[Check HelperMethods]
    B -->|Framework| F[Check Device/Screen]
    
    D --> G[Review Element Getter]
    D --> H[Review Method Logic]
    E --> I[Review Wait Strategy]
    E --> J[Review Interaction]
    
    G --> K[Update Locator]
    H --> L[Fix Page Method]
    I --> M[Adjust Timeout]
    J --> N[Fix Helper Method]
    
    style A fill:#ffcccc
    style K fill:#ccffcc
    style L fill:#ccffcc
    style M fill:#ccffcc
    style N fill:#ccffcc
```

---

## 📚 How to Read These Diagrams

1. **Architecture Overview**: Shows the layered structure of the framework
2. **Class Relationships**: Shows how classes relate (inheritance, composition, usage)
3. **Method Call Flow**: Shows the sequence of calls when executing a test
4. **Element Getter Pattern**: Shows how elements are accessed
5. **Pattern Comparison**: Visual comparison of old vs new approach
6. **Test Execution Flow**: Shows the flow during test execution
7. **File Structure**: Shows the organization of files and folders
8. **Benefits Visualization**: Mind map of pattern benefits
9. **Debugging Flow**: Decision tree for troubleshooting

## 🎨 Color Legend

- 🔵 Blue (`#e1f5ff`) - Test Layer
- 🟡 Yellow (`#fff4e1`) - Page Object Layer
- 🟢 Green (`#e8f5e9`) - Helper Layer
- 🟣 Purple (`#f3e5f5`) - Framework Layer
- 🔴 Red (`#ffcccc`) - Old Pattern
- ✅ Green (`#ccffcc`) - New Pattern

---

These diagrams provide a visual understanding of the framework architecture and how components interact with each other.
