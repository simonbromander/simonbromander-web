---
title: Building an Advanced E-commerce Filtering Prototype with Claude and Lovable
slug: building-advanced-ecommerce-filtering-prototype-claude-lovable
date: 2025-03-31
author: Simon Bromander
---
In this post, I'll walk you through my detailed process (using a fictional case study) of how I built an e-commerce prototype to test different filtering layouts using Claude and Lovable. You'll see exactly how AI tools can dramatically speed up the prototyping process while maintaining high-quality results.

Test the prototype yourself here:[https://grocery-gateway-compare.lovable.app/](https://grocery-gateway-compare.lovable.app/)  
It is not perfect, but I did build this in less than 30 minutes.

## Summary

*   Used Claude to create a comprehensive PRD for an e-commerce filtering prototype
    
*   Implemented two different filter UI layouts (sidebar and horizontal) for comparison testing
    
*   Successfully built a functional prototype with Lovable despite some initial challenges
    
*   Added real-time filtering, layout switching, and shopping cart functionality
    

## Step 1: Creating the PRD with Claude

I started by asking Claude to write a comprehensive PRD (Product Requirements Document) that I could provide to Lovable. My prompt was specific about what I needed:

```
Create a E-commerce site comparing two different filter UI layouts for an online grocery store:
1. Traditional sidebar filtering (vertical left sidebar)
2. Horizontal filtering bar across the top

Include:
- Toggle switch to alternate between layouts
- 15-20 grocery products across categories (Produce, Dairy, Bakery, Meat, Beverages, Snacks)
- Product details: name, image, price, category, dietary tags, rating
- Functional filters that update in real-time: categories, price range slider, dietary preferences, ratings, sort options, and sale toggle
- Responsive design for desktop and mobile
- Clean modern aesthetic with green (#4CAF50) and amber (#FFC107) color scheme
- Clear visual hierarchy and uniform product images

Implement proper state management to persist filters when switching layouts and include metrics tracking hooks for future analysis.
```

## Step 2: The Generated PRD

Claude delivered a detailed PRD that covered all the requirements:

> ### Grocery Store Filter UI Comparison Prototype
> 
> Context
> 
> The document explained the need to prototype and compare two filter UI approaches to determine which provides a better user experience.
> 
> #### Requirements
> 
> *   Toggle switch between filtering approaches
>     
> *   Realistic grocery product data (15-20 items)
>     
> *   Working real-time filter functionality
>     
> *   Responsive design for desktop and mobile
>     
> 
> #### Product Data Details
> 
> *   Categories: Produce, Dairy, Bakery, Meat, Beverages, Snacks
>     
> *   Product attributes: name, image, price, category, dietary tags, rating
>     
> *   Realistic price ranges and sale items
>     
> 
> #### Filter Options
> 
> *   Price range (slider)
>     
> *   Dietary preferences (checkboxes)
>     
> *   Categories (checkboxes)
>     
> *   Ratings (stars)
>     
> *   Sale toggle
>     
> *   Sort options (dropdown)
>     
> 
> #### UI Layout Details
> 
> The PRD included specific details for both layouts, with considerations for desktop and mobile views, as well as interaction patterns.
> 
> #### Visual Style
> 
> *   Primary color: #4CAF50 (green)
>     
> *   Secondary color: #FFC107 (amber)
>     
> *   Clean, modern aesthetic with ample white space
>     
> 
> #### Metrics and UX Considerations
> 
> The document also covered metrics to track and important UX factors to consider.

## Step 3: Creating a Simple Sketch

I added a simple wireframe sketch to visualize the two layouts:

<img src="https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/85586db0-af63-4cb7-975c-be7eed03f19d?key=7a894bd614971cd898c02176ece81d1f68ab77b374693d2ad6858e1262f04068" alt="" title="" width="2496" height="1076">

## Step 4: Working with Lovable

I provided both the PRD and sketch to Lovable to start building the prototype. My expectations were high since this is a common interaction pattern in e-commerce.

![](https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/7877780e-1152-4a39-88af-4a520be7030d?key=7148ca2206b6415f1cb9fd4e2b4a1902ab540d5a775b6a0bbad45b16c0a53a98)

## Step 5: Overcoming Challenges

I encountered a few errors during the build process, with Lovable aborting the task a couple of times:

<img src="https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/cc938e80-c15b-43e1-bc00-d6d2cf99bdc4?key=ad776503f4b7ffe53c5ff675ca91b7c9c441fa3a3ca38935c156f056621bef64" alt="" title="" width="1062" height="190">

However, I persisted by simply asking Lovable to continue building, and we eventually got past the errors.

<img src="https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/946cd9d8-44df-4b80-8cd2-17429a48a20b?key=57b44e268c3461e8a6dc539f7220f44a12c63286e552a987319b52b09e0269b4" alt="" title="" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); font-style: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration: none;" width="1072" height="1320">

## Step 6: The Functional Prototype

After a few iterations, Lovable delivered a working prototype with:

*   Both filtering layouts (sidebar and horizontal)
    
*   Real-time filter updates
    
*   Toggle switch to alternate between layouts **(see lower right corner)**
    
*   Responsive design
    

<img src="https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/9e952897-4d9f-4c96-9dac-dc37009651c7?key=edaa77eff38d154a376afb3661ada441f2ab2e7ad0811453f48f4db9a2b89be5" alt="" title="" width="2498" height="1806">

<img src="https://reflect-assets.app/v1/users/fatNdGIkPcSyQJd63D1g7NiDLPy1/f16e4365-a1cd-43bc-ab96-06f9bf3a96e2?key=45fe4380a624edb1659d3c0a046fd4d968adff00ffd2e66f01c984fa2463772e" alt="" title="" width="2506" height="1804">

The filters worked perfectly out of the box, and I could switch between layouts using the button in the **bottom right corner**.

## Step 7: Adding Shopping Cart Functionality

To push the prototype further, I asked Lovable:

```
Can we add functionality to add an item to the cart?
```

Lovable responded positively and implemented cart functionality:

"Let's implement the functionality to add items to the cart. We'll need to create a cart context, update the product card, and add toast notifications for user feedback."

A couple of minutes later I had a "add to cart button" on the cards, as well as "toast" message confirming that it has been added. The cart also counts the number of items I add.

## Next steps

Would probably be to start building this as a flow, maybe add a start page, build out search functionality, etc.

## Key Takeaways

1.  **AI-Powered Efficiency**: Using Claude to generate a detailed PRD saved significant time in the planning phase.
    
2.  **Iterative Problem-Solving**: Despite some initial errors, persisting with Lovable yielded excellent results.
    
3.  **Functional Prototyping**: The final prototype included working filters, layout switching, and cart functionality—all without writing code myself.
    
4.  **UX Testing Ready**: The prototype is now ready for user testing to compare the effectiveness of both filtering approaches.
    

This project demonstrates how AI tools can dramatically accelerate the prototyping process for UX designers, allowing for more rapid iteration and testing of design concepts.

* * *

_Simon Bromander is a Product Design & Strategy Lead focusing on innovation in design tools and processes._