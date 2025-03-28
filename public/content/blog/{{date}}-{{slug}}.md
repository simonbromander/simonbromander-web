---
title: A step-by-step guide to dramatically reducing prototyping time using AI tools
slug: step-by-step-ai-prototyping
date: 2025-03-28
author: Simon Bromander
thumbnail: /images/image.png
excerpt: Step-by-step guide to reveal my 'Vibe Prototyping' workflow that
  creates functioning, interactive prototypes with real behavior—not just visual
  simulations
---
Following my recent LinkedIn post about "Vibe Prototyping" that generated unexpected engagement, many of you asked to see exactly how I approach this process. In this post, I'll walk you through my step-by-step workflow that has dramatically reduced my prototyping time from 8+ hours in Figma to just 45 minutes using AI tools.

**The Tools I Use**

Before diving into the process, here are the key tools in my **Vibe Prototyping toolkit:**

*   [**Claude**](http://claude.ai) - My go-to AI assistant for ideation, generating prompts, and refining concepts
    
*   [**Lovable**](http://lovable.dev) - A tool for quickly building web interfaces with minimal friction
    
*   [**Cursor**](http://cursor.com) - An AI-powered code editor that excels at generating and refining code
    

**My 5-Step Vibe Prototyping Process**

## 1\. Sketch the Core Interaction (5-10 minutes)

I start with a basic sketch or wireframe that outlines the key elements and interactions I want to prototype. For example, when building a data table component, I'll sketch the column structure, sorting controls, and any special features like status indicators.

This sketch doesn't need to be polished - it's just to clarify my own thinking and provide a reference point.  

![](/images/CleanShot%202025-03-28%20at%2016.05.31@2x.png)

Here's a quick sketch I made using [Excalidraw](https://excalidraw.com)

## 2\. Write a Clear Initial Prompt (5 minutes)

The quality of your prompt significantly impacts the output. I often use [Claude](http://claude.ai) to help me refine my prompts before sending them to implementation tools.

![](/images/52_1x_shots_so.png)

```
I want you to write a PRD and very detailed prompt instructions to Lovable. The prompt should be clear concise and help me test the artifact with suers.
<insert detailed information on what you want to build and test here>
```

## 3\. Generate Initial Code (5-10 minutes)

After submitting your prompt, the AI will generate an initial version of your prototype. This first version rarely meets all requirements, but it provides a foundation to build upon.

## 4\. Iterate with Additional Prompts (20 minutes)

This is where the magic happens. Instead of manually coding or connecting prototype screens, you refine through additional prompts. Some examples of what I added:

```
The alignment of the text inside the rows is off. Please make sure to ALIGN the text vertically centered inside the rows. It is currently way to low
```

```
Contrast of selected cells does not meet WCAG AA, please make sure we do that
```

```
When I invoke EDIT mode the text jumps to the left, please review that and fix so that the text is persistent when editing.
```

![](/images/208_1x_shots_so.png)

## 5\. Test & Refine (10 minutes)

The beauty of this approach is that you're building a functioning prototype rather than a simulation. This means you can test real interactions including:

*   Keyboard navigation
    
*   Form validation
    
*   Conditional logic
    
*   Data manipulation
    

When I discover issues during testing, I can quickly address them with additional prompts rather than rebuilding prototype connections or creating new states manually.

In this phase I usually move on to Cursor. I do this by pushing my lovable project to GitHub and then opening it for further editing in Cursor.

## Key Tips I've Learned

*   **Be specific but not overly technical** in your prompts. Focus on describing behavior and appearance, not implementation details.
    
*   **Iterative refinement works better** than trying to get everything perfect in one prompt.
    
*   **Test as you go.** The main advantage is that you can immediately use the prototype to identify issues.
    
*   **Don't worry about code quality initially** - this is for prototyping, not production.
    
*   **Save your successful prompts** in a document for reuse across projects.
    
*   **For most tests, default UI styles are adequate.** You can always add your design system elements later if needed.
    

* * *

_Simon Bromander is a Product Design & Strategy Lead focusing on innovation in design tools and processes._