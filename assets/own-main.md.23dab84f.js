import{_ as s,c as n,o as a,a as l}from"./app.e2d1962b.js";const A=JSON.parse('{"title":"Supplying main() yourself","description":"","frontmatter":{},"headers":[{"level":2,"title":"Let Catch2 take full control of args and config","slug":"let-catch2-take-full-control-of-args-and-config"},{"level":2,"title":"Amending the Catch2 config","slug":"amending-the-catch2-config"},{"level":2,"title":"Adding your own command line options","slug":"adding-your-own-command-line-options"},{"level":2,"title":"Version detection","slug":"version-detection"}],"relativePath":"own-main.md","lastUpdated":1662589905000}'),e={name:"own-main.md"},p=l(`<p><a id="top"></a></p><h1 id="supplying-main-yourself" tabindex="-1">Supplying main() yourself <a class="header-anchor" href="#supplying-main-yourself" aria-hidden="true">#</a></h1><p>The easiest way to use Catch2 is to use its own <code>main</code> function, and let it handle the command line arguments. This is done by linking against Catch2Main library, e.g. through the <a href="./cmake-integration.html#cmake-targets">CMake target</a>, or pkg-config files.</p><p>If you want to provide your own <code>main</code>, then you should link against the static library (target) only, without the main part. You will then have to write your own <code>main</code> and call into Catch2 test runner manually.</p><p>Below are some basic recipes on what you can do supplying your own main.</p><h2 id="let-catch2-take-full-control-of-args-and-config" tabindex="-1">Let Catch2 take full control of args and config <a class="header-anchor" href="#let-catch2-take-full-control-of-args-and-config" aria-hidden="true">#</a></h2><p>This is useful if you just need to have code that executes before/after Catch2 runs tests.</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">catch2/catch_session.hpp</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char*</span><span style="color:#A6ACCD;"> argv</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // your setup ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Session</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> argv </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // your clean-up...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> result</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><em>Note that if you only want to run some set up before tests are run, it might be simpler to use <a href="./event-listeners.html#top">event listeners</a> instead.</em></p><h2 id="amending-the-catch2-config" tabindex="-1">Amending the Catch2 config <a class="header-anchor" href="#amending-the-catch2-config" aria-hidden="true">#</a></h2><p>If you want Catch2 to process command line arguments, but also want to programmatically change the resulting configuration of Catch2 run, you can do it in two ways:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char*</span><span style="color:#A6ACCD;"> argv</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">Session session</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // There must be exactly one instance</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // writing to session.configData() here sets defaults</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // this is the preferred way to set them</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> returnCode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">applyCommandLine</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> argv </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> returnCode </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#676E95;font-style:italic;"> // Indicates a command line error</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> returnCode</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // writing to session.configData() or session.Config() here</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // overrides command line args</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // only do this if you know you need to</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> numFailed </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // numFailed is clamped to 255 as some unices only use the lower 8 bits.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // This clamping has already been applied, so just return it here</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // You can also do any post run clean-up here</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> numFailed</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>If you want full control of the configuration, don&#39;t call <code>applyCommandLine</code>.</p><h2 id="adding-your-own-command-line-options" tabindex="-1">Adding your own command line options <a class="header-anchor" href="#adding-your-own-command-line-options" aria-hidden="true">#</a></h2><p>You can add new command line options to Catch2, by composing the premade CLI parser (called Clara), and add your own options.</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char*</span><span style="color:#A6ACCD;"> argv</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">Session session</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // There must be exactly one instance</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> height </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // Some user variable you want to be able to set</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // Build a new parser on top of Catch2&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">Clara</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">auto</span><span style="color:#A6ACCD;"> cli</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cli</span><span style="color:#89DDFF;">()</span><span style="color:#676E95;font-style:italic;">           // Get Catch2&#39;s command line parser</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Opt</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> height</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">height</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#676E95;font-style:italic;"> // bind variable to a new option, with a hint string</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">-g</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--height</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;font-style:italic;">    // the option names it will respond to</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">how high?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span><span style="color:#676E95;font-style:italic;">        // description string for the help output</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // Now pass the new composite back to Catch2 so it uses that</span></span>
<span class="line"><span style="color:#A6ACCD;">  session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cli</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> cli </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // Let Catch2 (using Clara) parse the command line</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> returnCode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">applyCommandLine</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> argv </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> returnCode </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#676E95;font-style:italic;"> // Indicates a command line error</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> returnCode</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // if set on the command line then &#39;height&#39; is now set at this point</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> height </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">cout </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">height: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> height </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">endl</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>See the <a href="https://github.com/catchorg/Clara/blob/master/README.md" target="_blank" rel="noopener noreferrer">Clara documentation</a> for more details on how to use the Clara parser.</p><h2 id="version-detection" tabindex="-1">Version detection <a class="header-anchor" href="#version-detection" aria-hidden="true">#</a></h2><p>Catch2 provides a triplet of macros providing the header&#39;s version,</p><ul><li><code>CATCH_VERSION_MAJOR</code></li><li><code>CATCH_VERSION_MINOR</code></li><li><code>CATCH_VERSION_PATCH</code></li></ul><p>these macros expand into a single number, that corresponds to the appropriate part of the version. As an example, given single header version v2.3.4, the macros would expand into <code>2</code>, <code>3</code>, and <code>4</code> respectively.</p><hr><p><a href="./Readme.html#top">Home</a></p>`,23),o=[p];function t(r,c,i,y,D,C){return a(),n("div",null,o)}var u=s(e,[["render",t]]);export{A as __pageData,u as default};