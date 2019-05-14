# !/bin/sh
#cd $TRAVIS_BUILD_DIR/ai-message_scrubber
heroku container:login
#
docker tag alabamaliquidservices/botic:latest-ms registry.heroku.com/botic-ai-ms/web
docker push registry.heroku.com/botic-ai-ms/web
heroku container:release web --app botic-ai-ms
#
#template
#
#docker tag <image> registry.heroku.com/<app>/<process-type>
#docker push registry.heroku.com/<app>/<process-type>