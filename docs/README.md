# Documentation

This directory contains all relevant documentation for this project.

Documentation will be done using Latex.

## Document Editor

Previously, we used Overleaf to edit our documentation. It provided a way for all members of the team to edit their documents simultaneously, however the history of these edits can only go back a limited period of time. 

Since we are using Github, we resolved to take advantage of its ability to keep history of edits indefinately. This means that all of our documentation is stored on this repository, where the history of their changes can be viewed much like the history of our code.

Once cloned into your machine, you can use any Latex Editor to open the latex file and edit it. You can compile that file using that program, and produce the pdf file. For consistency sake, I recommend the team to use <a href="http://www.tug.org/texworks/" target="_blank">TexWorks</a> which is a free and open source application used for creating and editing latex documents.

As for UML diagrams, we have resolved to using draw.io, mainly for its simplicity, accessibility and it ability for team collaboration and sharing.

## Documentation Pipeline

To edit the documentation stored within this directory, please follow the following steps.
1. Clone this repository and change your directory to 'docs'
```shell
git clone https://github.com/cos301-2019-se/Botic

cd docs
```
2. Use TexWorks, or your preferred latex editor/tex editor, to edit the latex files, each in their own folder. 
3. Once editing is finished, compile your document into a pdf in that document's directory using TexWorks, or your preferred latex editor, and inspect your changes.
4. If satisfied with your changes, run the 'moveDocuments.sh' script or manually move all new pdf files to the 'compiled' directory.
```shell
bash moveDocuments.sh
```
5. Add all changes all changes and commit them (remember, since you are in the docs directory, all changes in this directory will be added, and not other directories; run 'git status' to see if other files are not tracked as changes to be commited to prevent bundling all of their changes into this commit).
```shell
git add .
git commit -m \"<message\"
```
6. If that is all, push your changes to the repository.
```shell
git push
```
Now we can see the changes that you have made to the documentation.

## Deployment

Github pages will be used to make the documents accessible online.

## Accessing Document Versions

This is part of Software Configuration Management.
You can view the previous version of each file by going to the file on the repository and clicking 'History.'