---
title: "Setting up your first blog"
date: 2022-06-24T23:28:25+02:00
draft: false

description: ""

tags: ["content", "Markdown", "blog"]
categories: ["documentation"]

# https://github.com/wowchemy/wowchemy-hugo-themes/issues/978

resources:
- name: "featured-image"
  src: "featured-image.jpg"

---

# Build your blog with Hugo and GitHub Pages

In this blog post, we are going to create a **simple and minimalist personal** website using Hugo and GitHub Pages. With Github Pages, we can host a personal webpage without bothering about finding a domain name, and with Hugo, we have a variety of themes to choose from.

## Create your GitHub repository

First, you need to know that the name of your GH account or your repo will determine the URL where your web site will be located. Therefore, I recommend you to take some time to choose it.

According to the [official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-a-repository-for-your-site) you can:

1. Create a **user site**. Your site will we located at `<username>.github.io`. In this case, you need to create an organization and a repo in it with the name `<username>.github.io`.
2. Create an **organization site**. Your site will we located at `<org_name>.github.io`. In this case, you need to create an organization and a repo in it with the name `<org_name>.github.io`.
3. Create a **repository site**. Your site will we located at `<username>.github.io/<repo-name>`. . 

I strongly recommend **using option 1 or 2**, as this will improve the user experience.

> You can see my own git repository [here](https://github.com/alvarolop/alvarolop.github.io). All the information explained in this site is coded there.

## Setting up Hugo

Hugo is a **static site generator** that you can use to build **content-focussed, fast websites**. Static site generators usually allow you to write your content in a simple markup language, like Markdown. The static site generator then converts your content into static HTML files.

> If you want to set up your first Hugo application, I recommend you to use official [Getting Started](https://gohugo.io/getting-started/quick-start/) documentation. 
 
If you are lazy and want to copy-paste some commands to install Hugo on Fedora, you can follow these steps:

### Step 1: Install Hugo

```bash
sudo dnf install hugo
```

If you have a different distro, check the [official documentation](https://gohugo.io/getting-started/installing/#fedora-red-hat-and-centos).


### Step 2: Generate the repo scaffolding

```bash
git clone git@github.com:alvarolop/alvarolop.github.io.git
cd alvarolop.github.io
hugo new site . --force
```


### Step 3: Add your theme

Now, you need to choose the theme that you want to use in your Hugo website. Access the [official repository](https://themes.gohugo.io) to check them all. My blog is based on the [LoveIt Theme | Hugo](https://themes.gohugo.io/themes/loveit/), which has extra documentation in the [GitHub repository](https://github.com/dillonzq/LoveIt). The full documentation is in their [demo site](https://hugoloveit.com/).

```bash
git submodule add https://github.com/dillonzq/LoveIt.git themes/loveit
echo theme # \"loveit\" >> config.toml
```

Check other interesting themes are:
* [Hugo papermod](https://themes.gohugo.io/themes/hugo-papermod).
* [Hugo Coder](https://github.com/luizdepra/hugo-coder/).
* [Full list of themes](https://themes.gohugo.io/).


### Step 4: Create your first post

Use the `new` command to generate your first post:

```bash
hugo new posts/my-first-post.md
```



### Step 5: Start the Hugo server locally

```bash
hugo server -D
```

As shown in the logs, you can check your site at <http://localhost:1313>.


## Setting up GitHub Pages

> In order to deploy this site on GH Pages, I recommend you to follow the [official documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/#build-hugo-with-github-action
).

GitHub executes your software development workflows. Every time you push your code on the Github repository, Github Actions will build the site automatically.

Create a file in `.github/workflows/gh-pages.yml` containing the following content (based on actions-hugo):

{{< gist alvarolop ca8e3915cf8e9c1f5f78d7fa3920d8f4 >}}

Now, for every push, a new action will be created and the contents will be pushed to the `gh-pages` branch. You can see an example [here](https://github.com/alvarolop/alvarolop.github.io/tree/gh-pages).


