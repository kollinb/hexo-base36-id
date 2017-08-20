'use strict';

const fs = require('hexo-fs');
const path = require('path');

/* global hexo */
hexo.on('new', function(post) {
    
  let cache_path = path.join(hexo.base_dir, './article_cache.json');
  let cache = fs.readFileSync(cache_path);
  let cache_data = JSON.parse(cache.toString());
  
  let article_count = cache_data.article_count + 1;
  cache_data.article_count = article_count;
  
  fs.writeFileSync(cache_path, JSON.stringify(cache_data));

  let lines = post.content.split('\n');
  let index = lines.findIndex(item => item === 'id:');
  if (index > -1) {
    lines[index] += (' ' + (article_count).toString(36));
  } else {
    lines.splice(1, 0, 'id: ' + (article_count).toString(36));
  }

  post.content = lines.join('\n');
  if (post.path !== false) {
    fs.writeFile(post.path, post.content);
  }
});
