#!/bin/bash
for line in $(cat /tmp/requirements.txt)
do
  pip3 install $line -E app
done