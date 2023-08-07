import{_ as e,e as a,f as t,V as n}from"./chunks/framework.723ed59e.js";const i=JSON.parse('{"title":"[Background Usage] Framerate/Tracking Control","titleTemplate":":title | Kongying Tavern","description":"\\\\[Foreground Frame Rate] and [Background Frame Rate] can be configured in the General settings, it is recommended to reduce resource utilization by setting [Foreground Frame Rate] to 30-50 fps and [Background Frame Rate] to 1-10 fps, thus minimizing fps loss in-game.","frontmatter":{"aside":false,"titleTemplate":":title | Kongying Tavern","prev":{"text":"[Automatic Tracking] Troubleshooting","link":"../auto-tracking/troubleshoot"},"next":{"text":"[Multi Mark] Instructions","link":"../batch-selection/instructions"},"description":"\\\\[Foreground Frame Rate] and [Background Frame Rate] can be configured in the General settings, it is recommended to reduce resource utilization by setting [Foreground Frame Rate] to 30-50 fps and [Background Frame Rate] to 1-10 fps, thus minimizing fps loss in-game."},"headers":[],"relativePath":"en/manual/guide/bg/bgfrate.md","filePath":"en/manual/guide/bg/bgfrate.md","lastUpdated":1688797282000}'),r={name:"en/manual/guide/bg/bgfrate.md"},o=[n('<h1 id="background-usage-framerate-tracking-control" tabindex="-1">[Background Usage] Framerate/Tracking Control <a class="header-anchor" href="#background-usage-framerate-tracking-control" aria-label="Permalink to &quot;[Background Usage] Framerate/Tracking Control&quot;">​</a></h1><h2 id="framerate-control" tabindex="-1">Framerate Control <a class="header-anchor" href="#framerate-control" aria-label="Permalink to &quot;Framerate Control&quot;">​</a></h2><p>[Foreground Frame Rate] and [Background Frame Rate] can be configured in the General settings, it is recommended to reduce resource utilization by setting [Foreground Frame Rate] to 30-50 fps and [Background Frame Rate] to 1-10 fps, thus minimizing fps loss in-game.</p><p>If you wish to use the [Stay on Top] feature, which pins the map client window on top despite being out of focus, it is recommended to match both frame rate settings&#39; values.</p><figure><img src="/docs/imgs/en/manual/bg-frate/1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Dragging the frame rate slider to the leftmost position will enable [V-Sync], which matches the frame rate limit to your monitor&#39;s refresh rate.</p><figure><img src="/docs/imgs/en/manual/bg-frate/2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></div><h2 id="tracking-interval" tabindex="-1">Tracking Interval <a class="header-anchor" href="#tracking-interval" aria-label="Permalink to &quot;Tracking Interval&quot;">​</a></h2><p>[Tracking Interval] can be found under [Automatic Tracking] settings, the unit of its value is <strong>second</strong>.</p><ul><li>Reducing [Tracking Interval] will increase CPU usage (minimum 0.1 sec);</li><li>Increasing [Tracking Interval] will reduce CPU usage (maximum 1.0 sec), while reducing tracking responsiveness.</li></ul><figure><img src="/docs/imgs/en/manual/bg-frate/3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="background-suspend" tabindex="-1">Background Suspend <a class="header-anchor" href="#background-suspend" aria-label="Permalink to &quot;Background Suspend&quot;">​</a></h2><p>[Background Suspend] will hold the client in stasis completely when it is not in the foreground, you can enable this feature at the bottom right of the map client.</p><p>Reduces resource utilization and impact on in-game framerate.</p><figure><img src="/docs/imgs/en/manual/bg-frate/4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',14)];const s=e(r,[["render",function(e,n,i,r,s,g){return a(),t("div",null,o)}]]);export{i as __pageData,s as default};
