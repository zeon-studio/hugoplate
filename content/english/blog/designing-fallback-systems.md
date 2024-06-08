---
title: "Designing Fallback Systems"
meta_title: ""
description = "Learn about the importance of designing fallback mechanisms for your application: with a Golang example"
date: 2024-03-14
image: "/images/fallback-chart-new.png"
categories: ["Best Practices"]
author: "MacBobby Chibuzor"
tags: ["advice", "Go", "software-war-stories"]
draft: false
---

# A little backstory
While working on a backend for an uprising startup product a while back, 
I had to use a FinTech’s API for providing bank accounts to prospective users. 
It worked perfectly, and I moved on to other parts of the code. 
After completion, I decided to do one last test to see how everything works together, 
and then, the account provision API stopped working. 
After hours of debugging and logging everything, I concluded it was an issue with the API providers. 
I confirmed from my local backend engineering community and got further conviction 
that it was their issue. Then, I really understood the importance of having Fallback systems.

## Introduction

Adding fallback systems into code is a robust approach to enhancing how reliable a system is, while ensuring its continuity of service, even when certain components fail or don’t perform as expected. It is a strategy that is very crucial in financial applications, distributed systems, and any kind of software where uptime and reliability are critical.

For such systems, it is important to put the following steps and considerations in mind when incorporating fallback mechanisms in your software development cycle.

### Identifying critical components

Access critical paths in the software you build where failure would significantly impact functionality or user experience. Isolate components that are essential for the application’s operation but might fail, such as third-party services, database connections, or external APIs. Especially these three.

### Determine the failure scenarios

What does “failure” mean for each of these components? Define what failure means for each of the components: non-responsiveness, errors, unacceptable behavior, etc. Consider how each failure scenario affects the overall application.

### Design fallback strategies

Let’s group fallback strategies into four categories for now, based on limited available knowledge. Most of the examples mentioned are actual live experiences.

1. **Static Fallback:** Provide static or cached responses when dynamic content isn’t available. For example, caching crypto prices/conversion rates per day as a fallback strategy if a live fetch fails.
2. **Alternative services:** Switch to an alternative service or API if the primary one fails. For example, if SendGrid seizes to work, use MailJet as a fallback strategy.
3. **Feature degradation:** Reduce functionality gracefully instead of complete failure. For instance, if a recommendation engine fails, show popular items or categories as a fallback strategy.
4. **Retry Mechanisms:** Implement retries with exponential backoff for transient errors. For example, if your application builds faster than the database sets up, you may have to add retries for the connection to the database. A simple looping can work, but there are robust SDKs/tools for some programming languages to implement retries.

## Example of a fallback system simulated in Go for Crypto Price Fetching

Let's simulate a simple Go example that demonstrates a fallback system. This example will focus on a scenario where a primary service for fetching data fails, and the system automatically resorts to a fallback mechanism, such as using cached data or an alternative service. We'll use a simplified use case of attempting to fetch current cryptocurrency prices from an API; if the primary API fails, the system will use a secondary API as a fallback.

```go
package main

import (
    "fmt"
    "net/http"
    "io"
    "time"
)

// primaryAPI simulates fetching cryptocurrency prices from the primary API.
func primaryAPI() (string, error) {
    // Simulate an API request (this URL is fictional)
    resp, err := http.Get("https://primary-crypto-api.com/prices")
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }
    return string(body), nil
}

// fallbackAPI simulates fetching cryptocurrency prices from a fallback API.
func fallbackAPI() (string, error) {
    // Simulate a fallback API request (this URL is fictional)
    resp, err := http.Get("https://fallback-crypto-api.com/prices")
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }
    return string(body), nil
}

// getCryptoPrices attempts to fetch cryptocurrency prices using the primary API;
// if it fails, it tries the fallback API.
func getCryptoPrices() string {
    price, err := primaryAPI()
    if err != nil {
        fmt.Println("Primary API failed, attempting fallback...")
        fallbackPrice, err := fallbackAPI()
        if err != nil {
            fmt.Println("Fallback API also failed. Unable to fetch prices.")
            return "Error: Unable to fetch cryptocurrency prices."
        }
        return fallbackPrice
    }
    return price
}

func main() {
    // Fetch cryptocurrency prices, using fallback if necessary.
    prices := getCryptoPrices()
    fmt.Println(prices)
}
```

The example demonstrates several key concepts in implementing fallback systems:

{{< accordion "Error Handling" >}}

It checks for errors after attempting to call the primary API, which allows the program to react to failures dynamically.

{{< /accordion >}}

{{< accordion "Fallback Logic" >}}

Set appropriate timeouts for operations, and handle errors gracefully, transitioning to fallbacks as needed.

{{< /accordion >}}

{{< accordion "Modularity" >}}

The **`primaryAPI`** and **`fallbackAPI`** functions are defined separately, making the code more modular and easier to maintain or extend with additional fallback options.

{{< /accordion >}}

## Implementing Fallback Logic

For popular problems, you can implement these generic fallback logics ahead of time:

1. **Use circuit breakers:** Employ circuit breaker patterns to detect failure quickly and prevent a failing component from being repeatedly called, which can help in shifting to a fallback strategy faster.
2. **Timeouts and error handling:** Set appropriate timeouts for operations, and handle errors gracefully, transitioning to fallbacks as needed.
3. **Logging and monitoring:** Make sure to thorough log failures and use fallbacks. Also add monitoring to these incidents to understand their impact and frequency.

## Test the fallback systems

Well, of course, thoroughly testing the fallback systems(s) you employed is just as crucial.

{{< notice "tip" >}}
A good system is one that never triggers it’s fallback mechanism
{{< /notice >}}

You can do two types of testing for them based on your expertise:

1. **Automated testing:** Write tests to simulate failures of dependencies and ensure that fallbacks are triggered as expected.
2. **Chaos engineering:** Apply chaos engineering principles by intentionally introducing failures to test the resilience and fallback mechanisms of your system.

## Practical Implementation Tips

### **Libraries and frameworks**

Leverage existing libraries and frameworks that support resilience patterns. In Go ecosystem, we have [Failsafe-go](https://failsafe-go.dev/), [Hystrix-go](https://github.com/afex/hystrix-go), and [gobreaker](http://github.com/sony/gobreaker). In Java, there is [Hystrix by Neftix](https://github.com/Netflix/Hystrix), and [Resilience4j](https://resilience4j.readme.io/docs/getting-started).

### Improvements and coverage

It is safe to regularly review and update fallback mechanisms as you add new features to your codebase or as dependencies change. All the more reason to adopt hexagonal architecture or layered.

### Configuration management

Try to externalize configurations as much as possible for each fallback behaviors so that you can adjust their parameters easily without changing the code.

## Conclusion

Adding fallback mechanisms into your software development process is about expecting the unexpected and planning for it. This approach not only improves the reliability of your application, but also enhances the user experience by making sure that your application can continue to operate, albeit in a limited capacity, when certain parts aren’t functioning perfectly.
