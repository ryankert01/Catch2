import{_ as s,c as n,o as a,a as p}from"./app.e2d1962b.js";const A=JSON.parse('{"title":"Test fixtures","description":"","frontmatter":{},"headers":[{"level":2,"title":"Defining test fixtures","slug":"defining-test-fixtures"},{"level":2,"title":"Signature-based parametrised test fixtures","slug":"signature-based-parametrised-test-fixtures"},{"level":2,"title":"Template fixtures with types specified in template type lists","slug":"template-fixtures-with-types-specified-in-template-type-lists"}],"relativePath":"test-fixtures.md","lastUpdated":1662589905000}'),l={name:"test-fixtures.md"},e=p(`<p><a id="top"></a></p><h1 id="test-fixtures" tabindex="-1">Test fixtures <a class="header-anchor" href="#test-fixtures" aria-hidden="true">#</a></h1><h2 id="defining-test-fixtures" tabindex="-1">Defining test fixtures <a class="header-anchor" href="#defining-test-fixtures" aria-hidden="true">#</a></h2><p>Although Catch allows you to group tests together as sections within a test case, it can still be convenient, sometimes, to group them using a more traditional test fixture. Catch fully supports this too. You define the test fixture as a simple structure:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">UniqueTestsFixture</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">private</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">static</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">int</span><span style="color:#F07178;"> uniqueID</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">protected</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">   DBConnection conn</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">public</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#82AAFF;">UniqueTestsFixture</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">conn</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">DBConnection</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">createConnection</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">myDB</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">protected</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">int</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getID</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">uniqueID</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UniqueTestsFixture</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">uniqueID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TEST_CASE_METHOD</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UniqueTestsFixture</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Create Employee/No Name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[create]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#82AAFF;">REQUIRE_THROWS</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">conn</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">executeSQL</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">INSERT INTO employee (id, name) VALUES (?, ?)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getID</span><span style="color:#89DDFF;">(),</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">));</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TEST_CASE_METHOD</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UniqueTestsFixture</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Create Employee/Normal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[create]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">conn</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">executeSQL</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">INSERT INTO employee (id, name) VALUES (?, ?)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getID</span><span style="color:#89DDFF;">(),</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Joe Bloggs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>The two test cases here will create uniquely-named derived classes of UniqueTestsFixture and thus can access the <code>getID()</code> protected method and <code>conn</code> member variables. This ensures that both the test cases are able to create a DBConnection using the same method (DRY principle) and that any ID&#39;s created are unique such that the order that tests are executed does not matter.</p><p>Catch2 also provides <code>TEMPLATE_TEST_CASE_METHOD</code> and <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD</code> that can be used together with templated fixtures and templated template fixtures to perform tests for multiple different types. Unlike <code>TEST_CASE_METHOD</code>, <code>TEMPLATE_TEST_CASE_METHOD</code> and <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD</code> do require the tag specification to be non-empty, as it is followed by further macro arguments.</p><p>Also note that, because of limitations of the C++ preprocessor, if you want to specify a type with multiple template parameters, you need to enclose it in parentheses, e.g. <code>std::map&lt;int, std::string&gt;</code> needs to be passed as <code>(std::map&lt;int, std::string&gt;)</code>. In the case of <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD</code>, if a member of the type list should consist of more than single type, it needs to be enclosed in another pair of parentheses, e.g. <code>(std::map, std::pair)</code> and <code>((int, float), (char, double))</code>.</p><p>Example:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">template</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Fixture</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">Template_Fixture</span><span style="color:#89DDFF;">():</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">m_a</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    T m_a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">TEMPLATE_TEST_CASE_METHOD</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Template_Fixture</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A TEMPLATE_TEST_CASE_METHOD based test run that succeeds</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[class][template]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">float</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">double</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Fixture</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TestType</span><span style="color:#89DDFF;">&gt;::</span><span style="color:#F07178;">m_a </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">template</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Template_Fixture</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">Template_Template_Fixture</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    T m_a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">template</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Foo_class</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">size_t</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">size</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">TEMPLATE_PRODUCT_TEST_CASE_METHOD</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Template_Template_Fixture</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A TEMPLATE_PRODUCT_TEST_CASE_METHOD based test succeeds</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[class][template]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                  </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Foo_class</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">vector</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">                                  </span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Template_Fixture</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TestType</span><span style="color:#89DDFF;">&gt;::</span><span style="color:#A6ACCD;">m_a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">size</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p><em>While there is an upper limit on the number of types you can specify in single <code>TEMPLATE_TEST_CASE_METHOD</code> or <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD</code>, the limit is very high and should not be encountered in practice.</em></p><h2 id="signature-based-parametrised-test-fixtures" tabindex="-1">Signature-based parametrised test fixtures <a class="header-anchor" href="#signature-based-parametrised-test-fixtures" aria-hidden="true">#</a></h2><blockquote><p><a href="https://github.com/catchorg/Catch2/issues/1609" target="_blank" rel="noopener noreferrer">Introduced</a> in Catch2 2.8.0.</p></blockquote><p>Catch2 also provides <code>TEMPLATE_TEST_CASE_METHOD_SIG</code> and <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD_SIG</code> to support fixtures using non-type template parameters. These test cases work similar to <code>TEMPLATE_TEST_CASE_METHOD</code> and <code>TEMPLATE_PRODUCT_TEST_CASE_METHOD</code>, with additional positional argument for <a href="./test-cases-and-sections.html#signature-based-parametrised-test-cases">signature</a>.</p><p>Example:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">V</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Nttp_Fixture</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">int</span><span style="color:#F07178;"> value </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> V</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">TEMPLATE_TEST_CASE_METHOD_SIG</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    Nttp_Fixture</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A TEMPLATE_TEST_CASE_METHOD_SIG based test run that succeeds</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[class][template][nttp]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">((</span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> V</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> V</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Nttp_Fixture</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">V</span><span style="color:#89DDFF;">&gt;::</span><span style="color:#F07178;">value </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">template</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Fixture_2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">Template_Fixture_2</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    T m_a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">template</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">size_t</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">V</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Foo_2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">size_t</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">size</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> V</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">TEMPLATE_PRODUCT_TEST_CASE_METHOD_SIG</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    Template_Fixture_2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A TEMPLATE_PRODUCT_TEST_CASE_METHOD_SIG based test run that succeeds</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[class][template][product][nttp]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">((</span><span style="color:#C792EA;">typename</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">size_t</span><span style="color:#A6ACCD;"> S</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> T</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> S</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">array</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Template_Foo_2</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">((</span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">float</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">)))</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">Template_Fixture_2</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">TestType</span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;">{}.</span><span style="color:#A6ACCD;">m_a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">size</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="template-fixtures-with-types-specified-in-template-type-lists" tabindex="-1">Template fixtures with types specified in template type lists <a class="header-anchor" href="#template-fixtures-with-types-specified-in-template-type-lists" aria-hidden="true">#</a></h2><p>Catch2 also provides <code>TEMPLATE_LIST_TEST_CASE_METHOD</code> to support template fixtures with types specified in template type lists like <code>std::tuple</code>, <code>boost::mpl::list</code> or <code>boost::mp11::mp_list</code>. This test case works the same as <code>TEMPLATE_TEST_CASE_METHOD</code>, only difference is the source of types. This allows you to reuse the template type list in multiple test cases.</p><p>Example:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyTypes</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">tuple</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">double</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#82AAFF;">TEMPLATE_LIST_TEST_CASE_METHOD</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Template_Fixture</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                               </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Template test case method with test types specified inside std::tuple</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                               </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[class][template][list]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                               MyTypes</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">REQUIRE</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Template_Fixture</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TestType</span><span style="color:#89DDFF;">&gt;::</span><span style="color:#F07178;">m_a </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><hr><p><a href="./Readme.html#top">Home</a></p>`,22),o=[e];function t(r,c,F,D,y,i){return a(),n("div",null,o)}var u=s(l,[["render",t]]);export{A as __pageData,u as default};