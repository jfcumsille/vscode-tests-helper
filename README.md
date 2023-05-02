# Test Helper Extension

This is a Visual Studio Code extension that allows you to run tests for Ruby on Rails with RSpec and JavaScript with Jest. With this extension, you can easily run the tests for the file you are currently editing, if it's a test file, or choose a recent test file path.

## Features

- Run tests for the file you are currently editing, if it's a test file for Ruby on Rails with RSpec or JavaScript with Jest.
- Choose a recent test file path to run tests for Ruby on Rails with RSpec or JavaScript with Jest.
- Option to update snapshots from Jest tests when running them.
- If you have a `doppler.yml` file in your workspace, the extension will execute the command with `doppler run --`.

## Usage

To run tests for the file you are currently editing, press `Cmd+Shift+R` (`Ctrl+Shift+R`) or use the Command Palette (`Ctrl+Shift+P`) to search for the "Run tests" command.

When running Jest tests, you will be prompted if you want to update snapshots. If you choose "Yes", the extension will execute the Jest command with the `-u` flag.

If you have a `doppler.yml` file in your workspace, the extension will execute the command with `doppler run --`. This allows you to use environment variables from Doppler in your tests.

## Requirements

- Ruby on Rails with RSpec or
- JavaScript with Jest
- If using `doppler run --`, you need to have Doppler CLI installed and authenticated.

## Installation

You can install the extension from the Visual Studio Code Marketplace or by searching for "Test Runner" in the Extensions view (`Ctrl+Shift+X`).

## Configuration

This extension does not require any configuration. If you have a `doppler.yml` file in your workspace, the extension will automatically detect it and use it to execute commands with `doppler run --`.





