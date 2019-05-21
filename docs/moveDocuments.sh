# !/bin/sh
# This script moves all newly created documents
# Must run in the directory '...Botic/docs'
#
#
#Architecture and Deployment
#cd "uncompiled/Architecture and Deployment Diagrams"
#if [ ! -f "Botic_SRS.pdf" ]; then echo "The file does not exist"; fi
#cd "uncompiled/Coding Standards"
cd "uncompiled/SRS"
if [ -f "Botic_SRS.pdf" ]; then 
    rm "../../compiled/Botic_SRS.pdf"; #remove old one
    mv "Botic_SRS.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..
#cd "uncompiled/Testing Policy"
#cd "uncompiled/User Manual"