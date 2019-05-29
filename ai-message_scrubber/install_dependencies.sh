#!/bin/bash
for line in $(cat requirements.txt)
do
  pip3 install $line -E app
done