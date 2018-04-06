**NOTE: Prototype kit is not really usable yet.**

# Prototype Kit



Prototype kit (PK) A set of scripts, components, and modules to do rapid prototyping of workflows.

## TODO:
- Bulma Documentation 
- Bulma Workflow Page Templates Integration
- listables of items
- Login Component (Document and Implement)

## Intro

In the vast world of prototyping tools, including paper, sketch, invision, oragami, and more, PK is optimized for **exploring workflows**. It gives the bare bones needed to quickly build HTML/CSS pages that mimic the expected behavior of the real app.

PK aims to have the same fidelity as paper prototypes. Both are meant to be used when the idea is still forming to quickly discover issues and and test multiple solutions. Whereas paper prototype helps you quickly explore the components of each page and how they will work, PK aims to explore user choices - the input and selections of different options that lead to various results.

PK's goal is to be as **quick as paper prototypes to build** but still **correctly simulate use**, like link clicks and form submissions. It also aims to provide a framework for testers to explore scenario options with narration and navigational tools.

## Quick Start

* clone the repo
* open up terminal and navigate to the folder
* run `npm install && bower install`
* run `gulp watch`
* Add pages to `src/pages/` and go wild!

## The Tools behind Prototype-kit

In it's core, PK uses nunjucks and sass to build HTML and CSS. However, included with PK is several core modules that you can utilize for navigation, form fill/data storage, and more.

### Gulp
[Todo: write about gulp usage]

### File structure

The two major folders within PK are `src` and `public`. `public` is the folder that all the templates and css compiles to, and `src` is the folder where all your uncompiled templates and sass are. 

You do not want to work out of `public`. Put css/js libraries, images and other content in `public` so you html files can load them and then leave the section alone.

Within `src` is your pages, partials, and scss. When gulp watch is running, these pages are instantly compiled into public whenever a file is changed, allowing for instant updates to your web pages.

### Nunjucks & SASS References

PK is meant for development speed. If you know HTML and CSS but not Nunjucks and Sass, you should still feel free to dive right in. However, both Nunjucks and Sass have powerful composition tooling which allow you to write reusable code and can greatly speed up development time, so learning the basics is quite helpful.

The Nunjucks documentation is pretty good: https://mozilla.github.io/nunjucks/. If you have never used nunjucks before, the examples that are given there plus the initial template in PK should give you enough to get started. 

The sass docs are also good: http://sass-lang.com/guide. I like to follow a components based approach to build sass using BEM style. 

## PK Components

At the core of PK is an opinionated set of components that help define workflows and enable their user testing.

#### Narration:

The narration block is a styled popup that explains a page or the context for how you arrived at the page. Any time you have to explain to a user what is going on within the app, you should use the narrator.

To use, add a narrator block to your page template like so:
```
{% block narrator %}
    <p>Scenario: <b>You’ve just signed up and logged in.</b></p>
{% endblock %}
```

The following are some use cases for the narrator:

* Introducing the app to the tester with a small pitch
* Describing what happens without building the full experience out.
* If an event triggers the app to notify the user, you can describe what triggered the scenario *(after 5 days pass, you receive this email asking you to do this)*
* And lots more. Generally anything that breaks the 4th wall should use the narrator component.

If you would like to see how it is built, checkout `src/partials/narrator.njk` and `src/scss/base/narrator.scss`

The narrator block also contains automatic navigation links through the workflow.

The narration block is absolutely positioned and doesn't mess with your layout. It is shown when the page loads, but hides once the page scrolls or anything is clicked on.

#### Navigation:

Prototype kit uses a **naming convention** based on outlines for file names covering two types of workflows - linear workflows and decision trees.

Following the naming convention allows PK to create dynamic links to the next, previous, parent and child pages and also build a site map. **These dynamic links are really, really helpful when moving around pages or adjusting workflows** since you do not have to change the links on the pages every time, and also in navigating through the pages quickly through a site map on the user testing end.

##### Linear Workflow

PK expects linear workflows to have a starting point and also to be ordered by number: ie.
```
// all .njk files will be compiled to .html files in the public folder

index.njk
1.njk
2.njk
3.njk
...
12.njk
13.njk
```

The starting point is either index.njk, or an option of a decision tree.

##### Decision Tree Workflow

If a screen leads to multiple outcomes, the primary outcomes will be the next linear workflow, and other outcomes will be lettered like so:

```
...
2.njk //has multiple outcomes
3.njk 
  3_a.njk //is primary outcome (and also is next linear workflow)
  3_b.njk //is second outcome
  3_c.njk //is third outcome
  ...
  3_z.njk
4.njk //continues the linear workflow from 3.njk
```

Linear and tree workflows can be nested. A linear workflow can split into multiple outcomes, which can each have a linear workflow, etc. 
```
index.njk
1.njk
2.njk
  //decision tree
  2_a.njk //this is 'the index page' of workflows from 2a
    //decision tree of 2a
    2_a_a.njk
    2_a_b.njk
    2_a_c.njk
    //linear workflow of 2a
    2_a_1.njk 
    2_a_2.njk 
    2_a_3.njk 
    //decision tree stemming from 2a3
      2_a_3_a.njk // yes, this can get confusing
      2_a_3_b.njk
      2_a_3_c.njk
  2.b.njk
  2.c.njk
4.njk
```

##### Inserting

Sometimes, you are in the groove and cranking out pages, only to realize that you missed page 2, and you are on page 15. To insert a page 2 means you have to rename files 3-15 - too much work. Instead, you can use the insert naming scheme:

```

1.njk
2.njk
2__1.njk //insert 2__1.njk between 2.njk & 3.njk
3.njk
4.njk
5.njk

//From 2.njk, NEXT goes to 2-1.njk instead of 3.njk
//From 3.njk, PREV goes to 2-1.njk instead of 2.njk
//From 2__1.njk, next and prev go to 2.njk or 3.njk

```

If you have too many inserts and would like to have a clean file tree again, simply run `gulp fix` in the command line:

```
// pages are too messy?

1.njk
1__1.njk
1__2.njk
2.njk
2__1.njk
2__2.njk
3.njk
3_a.njk
3_a__1.njk
3_b.njk
3_c.njk
4.njk
5.njk

// running `gulp fix` will rename your files to:
1.njk
2.njk // was 1__1.njk
3.njk // was 1__2.njk
4.njk
5.njk // was 2__1.njk
6.njk // was 2__2.njk
7.njk
7_a.njk
7_b.njk // was 3_a__1.njk 
7_c.njk
7_d.njk
8.njk
9.njk
```

##### Q: Why do you use '_' for your naming convention? Why not '.', '-', ' ', or something else that is slightly easier to type?

Ordering. Visual Studio Code is the best - you can use whatever you like and it will show in the file tree correctly, but Sublime text only shows the correct order with '_'. Atom is a lost cause. 

```
// In my opinion, this looks pretty clean:
1.njk
2.njk
3.njk
  3.a.njk
  3.b.njk
  3.c.njk
4.njk

// But it actually shows up like this:
1.njk
2.njk
3.a.njk
3.b.njk
3.c.njk
3.njk // move back up please!!!
4.njk

// no good.
```


##### Name scoping your workflows

If you would like to name scope your workflows you can do so in two ways:

The first is through folder structure. 
```
|- public
  |- folder1 //the url to view will be localhost:3000/folder1/index.njk
     |- index.njk
     |- 1.njk
     |- etc
  |- folder2 // localhost:3000/folder2/
     |- index.njk
     |- 1.njk
     |- etc
```

The second is by prefixing a name onto the file followed by a '-'. As long as you don't use '_' in your file, it should work fine. However, you lose the file ordering if this is the case
```
|- public
  |- index.njk // localhost:3000/pinitdraft.njk
  |- login-1.njk
  |- step2-2.njk
  |- multi-step-process-choiceA-2_a.njk
  |- etc
```

Once you have followed the naming convention in creating your files, anytime you create links, you can add the class 'pknav' to enable dynamic navigation from it:

```

/* Classes to add navigation functionality 
 * Usage: Add to any button, link or div like so:
 * <a class='pknav next'>Next</a>
 */

'pknav' - Enable navigation functionality on any HTML element 

'start' or 'index' - will go to index.html

'next' - will go to the next linear workflow.
'prev' - will go to the previous linear workflow

'parent' - will go to the start point for the decision tree.
'child-[a-z]' - ie: 'child-a', 'child-b', 'child-c', etc. Will go that particular decision node

```


Prototype kit assumes a convention of numbered pages. For linear workflows, PK looks for html pages that are numbered in order (ie: index.html, 1.html, 2.html, 3.html, etc.). If a page (1.html) can lead to multiple decisions, the decisions start with 2.html, and then use letters to denote the various options (2.html, 2a.html, 2b.html, 2c.html, etc). These pages can also have linear workflows or decision trees assigned to them: (ie: 2a.html, 2a1.html 2a2.html, 2a3.html OR 2a.html -> 2a1.html, 2a1a.html, 2a1b.html)

This navigation can be compiled into a site map with helpers that allow it to be easily browsed through in the narration module (TODO).

#### Forms & Variables
PK uses localstorage to save data, mimicking form submission, login, etc. The variables are stored across the app and easily accessible with an API.

##### Forms
Forms with a `pkls` class (stands for: Prototype-Kit-Load-Save) will detect, save, and load any user inputted data submitted. To use:

```
  <form class="pkls">
    <input name="project.title" />
    <textarea name="project.description"></textarea>

    <button>Save</button>
  </form>
  // on form submit, saves and loads data as: 
  { project: {
    title: "<input text>",
    description: "<textarea text>"
    }
  }
```

You can also use the `pkls` class on any inputs, links, divs, or other custom elements that aren't included in a form. Just add a name or value element like so, and they will both save and load user inputted data.

```
<input class="pkls" name="project.title" />  // Saves input value on change.
<a class="pkls" name="project.settings.option" value="b">Option B</a> // Saves project.settings.option to be "b". 'pkls' detects this is loaded and adds a highlight class to it.
<div class="pkls" name="project.id" value="3"> This is a project card.</div> // Saves project.id to be "3".

```

Note: This will also add select-on-click functionality to any element. To have multi-select functionality, add the attribute, `pk-multi-select="true"`:

```
// this is a single select, which means that when a user clicks a div, only one value will be saved and thus highlighted:
<div class="pkls" name="project.id" value="1"> P1</div> 
<div class="pkls" name="project.id" value="2"> P2</div> 
<div class="pkls" name="project.id" value="3"> P3</div> 
// id will be only one value.
{ project: {
  id: 1
  }
}

// this is a multi-select element:
<div class="pkls" name="project.ids" value="1" pk-multi-select="true"> P1</div> 
<div class="pkls" name="project.ids" value="2" pk-multi-select="true"> P2</div> 
<div class="pkls" name="project.ids" value="3" pk-multi-select="true"> P3</div> 
// id can be now multiple values, so this is possible
{ project: {
  id: [1, 2, 3]
  }
}

```

You can also load data anywhere with a `pkload` attribute, like so:

```
The title on your project form was <span pkload="project.title">If no project, this default text will show instead.</span>.
```

#### Chooser
pk-chooser and pk-choice is a class that helps you in user selection. The goal is to provide an easy copy paste workflow for user selection.

  #### Google+ login one click drop in

#### Survey links
Embed a survey link to typeform or google docs easily with these helper classes in the narration module.

#### Intro, outro, and test pages
PK is meant to be easy to have real users test it. Build it, upload it to a server, and send the url to your user testers. Build your surveys for feedback. 

### Goals of development

* Build pages quickly. You may need 40-50 pages to cover all the various scenarios, so move fast. 
* Ignore layout, font, color, branding, and design decisions as much as possible. Focus on narration and functionality. Utilize frameworks like Bootstrap or Milligram to have a clean, consistent style.
* 

