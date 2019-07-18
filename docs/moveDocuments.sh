# !/bin/sh
# This script moves all newly created documents
# Must run in the directory '...Botic/docs'
#
#
#Architecture and Deployment
#cd "uncompiled/Architecture and Deployment Diagrams"
cd "uncompiled/Architecture_and_Deployment_Diagrams"
if [ -f "Architecture_and_Deployment_Diagrams.pdf" ]; then
    rm "../../compiled/Architecture_and_Deployment_Diagrams.pdf"; #remove old one
    mv "Architecture_and_Deployment_Diagrams.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..
#cd "uncompiled/Coding Standards"
cd "uncompiled/Coding_Standards"
if [ -f "Coding_Standards.pdf" ]; then
    rm "../../compiled/Coding_Standards.pdf"; #remove old one
    mv "Coding_Standards.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..
#cd "uncompiled/SRS"
cd "uncompiled/SRS"
if [ -f "Botic_SRS.pdf" ]; then 
    rm "../../compiled/Botic_SRS.pdf"; #remove old one
    mv "Botic_SRS.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..
#cd "uncompiled/Testing Policy"
cd "uncompiled/Testing_Policy"
if [ -f "Testing_Policy.pdf" ]; then
    rm "../../compiled/Testing_Policy.pdf"; #remove old one
    mv "Testing_Policy.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..
#cd "uncompiled/User Manual"
cd "uncompiled/User_Manual"
if [ -f "User_Manual.pdf" ]; then
    rm "../../compiled/User_Manual.pdf"; #remove old one
    mv "User_Manual.pdf" "../../compiled"; #replace with new
fi
cd .. & cd ..