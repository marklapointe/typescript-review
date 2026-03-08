# Makefile for React + TS Blog Review

.PHONY: install dev run debug build preview clean test test-ui

# Default target
all: dev

# Install dependencies
install:
	npm install

# Run the development server
dev:
	npm run dev

# Run the development server and open the browser
debug:
	npm run dev -- --open

# Alias for dev
run: dev

# Run tests
test:
	npm run test

# Run tests with UI
test-ui:
	npm run test:ui

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Clean build artifacts
clean:
	rm -rf dist
