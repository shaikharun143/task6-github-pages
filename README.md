# 🚀 DevOps Portfolio Website – GitHub Pages Deployment

## 📌 Project Overview

This project demonstrates how to host a static website using **GitHub Pages** as part of a DevOps internship task.

The website serves as a simple DevOps portfolio showcasing personal information, skills, and contact details. The project was developed locally on an Ubuntu Virtual Machine running inside **Oracle VirtualBox**, connected through **MobaXterm**, and version-controlled using Git before being deployed to GitHub Pages.

---

## 🎯 Objective

The objective of this project is to:

* Create a static website using HTML and CSS.
* Manage the project using Git version control.
* Push the source code to GitHub.
* Deploy the website using GitHub Pages.
* Understand the complete workflow from local development to cloud deployment.

---

## 🛠️ Technologies Used

### Development

* HTML5
* CSS3
* Java Script

### Version Control

* Git
* GitHub

### Deployment

* GitHub Pages

### Environment

* Oracle VirtualBox
* Ubuntu Linux Virtual Machine
* MobaXterm SSH Client

---

## 📂 Project Structure

```text
task6-github-pages/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
```

---

## ⚙️ Setup Process

### Step 1: Create Virtual Machine

* Installed Ubuntu Linux inside Oracle VirtualBox.
* Configured network settings.
* Started the Ubuntu virtual machine.

### Step 2: Connect Using MobaXterm

Connected to the Ubuntu VM from MobaXterm using SSH.

Example:

```bash
ssh username@ip-address
```

This allowed remote access to the Linux environment.

---

### Step 3: Create Website Files

Created:

```bash
index.html
style.css
script.js
```

Implemented the portfolio website structure and styling.

---

### Step 4: Initialize Git Repository

```bash
git init
```

---

### Step 5: Add Project Files

```bash
git add .
```

---

### Step 6: Commit Changes

```bash
git commit -m "Initial commit"
```

---

### Step 7: Connect GitHub Repository

```bash
git remote add origin https://github.com/shaikharun143/task6-github-pages.git
```

---

### Step 8: Push Code to GitHub

```bash
git branch -M main
git push -u origin main
```

---

### Step 9: Enable GitHub Pages

GitHub Repository → Settings → Pages

Configuration:

* Source: Deploy from Branch
* Branch: main
* Folder: /root

After saving, GitHub automatically generated a public URL for the website.

---

## 🌐 Live Website

Website URL:

https://shaikharun143.github.io/task6-github-pages/#hero

---

## 📁 GitHub Repository

Repository URL:

https://github.com/shaikharun143/task6-github-pages

---

## ✨ Features

* Responsive Portfolio Layout
* Home Section
* About Section
* Skills Section
* Contact Section
* Clean User Interface
* Hosted for Free using GitHub Pages

---

## 📚 Git Commands Used

```bash
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/shaikharun143/task6-github-pages.git

git push -u origin main
```

---

## 📸 Screenshots

Include the following screenshots in the repository:

1. Local project files
2. Git commit history
3. GitHub repository
4. GitHub Pages settings
5. Live website

---

## 🎓 Learning Outcomes

After completing this project, I learned:

* Creating and managing Git repositories.
* Working with GitHub remote repositories.
* Using Git commands effectively.
* Hosting static websites with GitHub Pages.
* Connecting Ubuntu Virtual Machines through MobaXterm.
* Understanding a basic DevOps deployment workflow.
* Publishing web applications to the internet.

---

## 🔮 Future Improvements

* Add JavaScript functionality.
* Improve responsiveness for mobile devices.
* Add animations and transitions.
* Integrate contact form functionality.
* Deploy advanced projects using Docker and Kubernetes.

---

## 👨‍💻 Author

**Harun Yahya Shaik**

B.Tech – Computer Science and Engineering

GitHub: https://github.com/shaikharun143

---

## ✅ Task Status

Successfully completed Task 6: Host a Static Website with GitHub Pages and deployed the website online using GitHub Pages.
