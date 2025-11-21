# MythOS Studio Documentation (v2)

This document provides a detailed overview of the MythOS Studio project, its structure, and its core components. It is intended for developers who wish to understand and contribute to the codebase.

## 1. Overview

MythOS Studio is a standalone, browser-based application for authoring and managing complex character and world-building data for lore and narrative engines. It provides a rich graphical user interface (GUI) to edit actors, relationships, speech patterns, and other narrative elements.

The entire application is self-contained and runs from a single `index.html` file, utilizing vanilla ES5 JavaScript and CSS. It has no external runtime dependencies and does not require a build step.

## 2. Getting Started

To run the application, simply open the `index.html` file in a modern web browser.

## 3. Project Structure

The codebase is organized into several key directories:

-   `/css`: Contains all styling for the application.
-   `/engine`: Contains the core logic for processing the narrative data.
-   `/js`: Contains all the JavaScript for the application's UI and client-side logic.
    -   `/app`: Core application logic like tab management and bootstrapping.
    -   `/core`: The central nervous system of the app, including the state store, event bus, and data persistence.
    -   `/ui`: Contains the logic for each UI panel, separated by feature.
    -   `/studio`: Application-level components like the main router.
    -   `/tests`: Scripts for testing and validation.

## 4. Core Architectural Components

The application is built around a few key architectural patterns.

### State Management (`js/core/store.js`)

The application uses a single, centralized state store, exposed as `window.CFGStore`. This object is the single source of truth for the entire configuration (`CFG`) that the user is building.

-   **`CFGStore.get()`**: Returns the current CFG object.
-   **`CFGStore.set(cfg)`**: Overwrites the entire CFG object.
-   **`CFGStore.patch(mutatorFn)`**: Allows for safe, in-place modification of the CFG. This is the preferred way to make changes.
-   **`CFGStore.select(selectorFn, callback)`**: Subscribes to changes in a specific part of the state.

### Event Bus (`js/core/bus.js`)

A lightweight pub/sub event bus, `window.CMvNext.bus`, is used for communication between different modules without creating tight coupling. This allows panels to react to events initiated by other parts of the application.

-   **`bus.emit(eventName, payload)`**: Dispatches an event.
-   **`bus.listen(eventName, callback)`**: Subscribes to an event.

### UI and Panel Management

The UI is composed of "panels," which are self-contained components responsible for a specific feature (e.g., Actors, Focus).

-   **Routing (`js/studio/router.js` & `js/app/tabs.js`)**: A simple, custom router handles showing and hiding panels.
-   **Panel Lifecycle**: Each panel script (e.g., `js/ui/actors/actors.panel.js`) is expected to expose a global object `window.CMPanel_<panel_name>` with `mount(rootElement)` and `unmount()` methods.

## 5. File-by-File Breakdown

This section provides a TLDR for each significant JavaScript file in the project.

### `/engine`

This directory contains the core narrative and validation logic, designed to be portable to a target environment.

-   **`engine/EMCE_Expressive_Micro_Cue_Engine.js`**
    -   **TLDR**: The main, self-contained narrative engine. It takes a full CFG export, analyzes the current state (transcript, character data), and generates expressive cues and narrative fragments.
-   **`engine/auditor.rules.js`**
    -   **TLDR**: A validation script that inspects a CFG object for correctness, completeness, and adherence to engine constraints. It returns a list of errors and warnings.

### `/js/app`

Handles the main application startup and tab controls.

-   **`js/app/bootstrap.cfg.js`**
    -   **TLDR**: Initializes the main `CFGStore` from a legacy `GUI.State.CFG` object and creates a getter/setter to keep them synchronized for backward compatibility.
-   **`js/app/tabs.js`**
    -   **TLDR**: Manages the UI tabs. It handles switching between panels and calls the `mount()` and `unmount()` lifecycle methods on each panel module.

### `/js/core`

The central nervous system of the application.

-   **`js/core/actors.access.js`**
    -   **TLDR**: Provides a set of helper functions to safely read actor data (e.g., get by ID, get all entries, get a display name) from the main `CFGStore` without needing to know if the `actors` object is an array or a map.
-   **`js/core/bus.js`**
    -   **TLDR**: A simple, lightweight, dependency-free pub/sub event bus for inter-module communication.
-   **`js/core/engine.templates.js`**
    -   **TLDR**: A registry for loading and retrieving engine script templates (like the JanitorAI skeleton) via XHR.
-   **`js/core/export.core.js`**
    -   **TLDR**: Handles the logic for exporting the main CFG object into different formats, including a minimal "engine-safe" version and a full developer version.
-   **`js/core/export.package.js`**
    -   **TLDR**: Takes a JavaScript template and a CFG object, and injects the CFG as a JSON variable into the template, preparing it for export.
-   **`js/core/io.files.js`**
    -   **TLDR**: Browser-based file I/O helpers for downloading text files and reading user-uploaded files.
-   **`js/core/persist.local.js`**
    -   **TLDR**: Manages saving, loading, and clearing the entire author profile to and from the browser's `localStorage`.
-   **`js/core/schema.normalize.js`**
    -   **TLDR**: A crucial script that takes a raw CFG object and normalizes it, filling in missing default values and ensuring a consistent data structure for the rest of the application to work with.
-   **`js/core/store.js`**
    -   **TLDR**: The single source of truth. Implements the `CFGStore` for reactive state management.

### `/js/studio`

High-level application components.

-   **`js/studio/router.js`**
    -   **TLDR**: A minimal, dependency-free UI router that handles showing/hiding the main "Basic", "Advanced", and "Experimental" sections and their child panels.

### `/js/ui`

Contains the code for each individual UI panel.

-   **`js/ui/actors/actors.panel.js`**
    -   **TLDR**: Manages the "Actors" panel UI for creating, editing, and deleting actors, including their profiles, appearance, and personality traits.
-   **`js/ui/actors/actors.anatomy.patch.js`**
    -   **TLDR**: A non-destructive patch that injects the "Anatomy/Appendages" card into the existing Actors panel, allowing for modular feature addition.
-   **`js/ui/actors/actors.radar.js`**
    -   **TLDR**: A rendering utility to draw the OCEAN personality radar chart on an HTML canvas.
-   **`js/ui/actors/actors.units.js`**
    -   **TLDR**: A helper module for converting height measurements between US customary units (feet/inches) and metric (cm).
-   **`js/ui/debug/debug.panel.js`**
    -   **TLDR**: Provides a simple debug panel for viewing the live CFG object and running validation checks.
-   **`js/ui/engine/engine.panel.js`**
    -   **TLDR**: Manages the "Engine" panel UI, allowing the user to configure token limits, engine biases, and other technical parameters.
-   **`js/ui/focus/focus.alloc.js`**
    -   **TLDR**: Contains the core logic for calculating and rebalancing token focus allocation among actors when values are changed.
-   **`js/ui/focus/focus.panel.js`**
    -   **TLDR**: Manages the "Focus" panel UI, including the sliders and number inputs for setting actor token allocation.
-   **`js/ui/focus/focus.radar.js`**
    -   **TLDR**: Renders the circular "Focus Radar" visualization, showing the distribution of token focus among actors.
-   **`js/ui/lorebook/lorebook.panel.js`**
    -   **TLDR**: Manages the entire "Lorebook" panel, a two-pane editor for creating, editing, searching, and managing lorebook entries.
-   **`js/ui/lorebook/lore.*.js`**
    -   **TLDR**: A collection of library files for the lorebook, handling data modeling (`lore.model.js`), validation (`lore.validate.js`), import/export (`lore.io.js`), diffing (`lore.diff.js`), and searching (`lore.search.js`).
-   **`js/ui/project/project.panel.js`**
    -   **TLDR**: Manages the main "Project" panel, handling project metadata, notes, and triggering export/save/load actions.
-   **`js/ui/relationships/relationships.panel.js`**
    -   **TLDR**: Manages the "Relationships" panel, allowing the user to define how actors view each other using sliders and presets.
-   **`js/ui/relationships/relationships.graph.js`**
    -   **TLDR**: Renders the "Compass" graph visualization for relationships.
-   **`js/ui/speech/speech.panel.js`**
    -   **TLDR**: Manages the "Speech" panel, where users define actor tone, pacing, verbosity, quirks, and emotional cues.
-   **`js/ui/speech/SpeechQuirks.js`, `speech.cues.js`, etc.**
    -   **TLDR**: Helper modules for the speech panel that provide default data and libraries for quirks and cues.
-   **`js/ui/testing/testing.panel.js`**
    -   **TLDR**: Manages the "Testing" panel, which allows users to run simulated narrative scenarios to preview how the engine will use their configured data.
-   **`js/ui/testing/testing.runner.js` & `testing.scenarios.js`**
    -   **TLDR**: The logic for running test scenarios and the predefined scenario data itself.
-   **`js/ui/tokens/tokens.panel.js`**
    -   **TLDR**: Manages the "Tokens" panel, which provides a detailed breakdown and cost estimation of the entire lorebook.

## 6. Contributing Guidelines

-   **JavaScript Standard**: All JavaScript must be ES5-compliant.
-   **Modularity**: Use the IIFE (Immediately-Invoked Function Expression) pattern to encapsulate modules.
-   **Styling**: CSS for panels should be scoped to the panel's root ID (e.g., `#panel-actors`).
-   **Consistency**: Adhere to the existing coding style and architectural patterns.