import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import moment from "moment"
import Button from '@material-ui/core/Button';
import axios from "axios";
import InnerHTML from "dangerously-set-inner-html/index";

const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;   
    width:100%;
`
const ListContainer = styled.div`
    margin: 20px 100px 100px 100px;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    align-items: center;
    padding:10px;
    box-shadow: 0px 0px 25px #EF8236;
    width: 100%;
    height: 100%;
    overflow-x:hidden;
`
const SearchContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    border-radius: 10px;
    margin: 10px 20px;    
    box-shadow: 0px 0px 25px black;
    padding-left:50%;
    
`
const Title = styled.h1`
    color:#EF8236;
    text-decoration: underline;
`

function Home() {
    let [tagged, setTagged] = useState("")
    let [questions, setQuestions] = useState([]);

    const handleSearchInput = (input) => {
        setTagged(input.target.value)
    }
    const handleSearch = () => {
        // axios.get(
        //     `https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=1613865600&todate=1614556800&order=desc&sort=votes&tagged=${tagged}&site=stackoverflow&filter=!*PBQNA2D-Y)jggiwb8s1L)bS3FX1MjsI4j0vFNb7pCMhx39lT`
        // )
        //     .then((response)=> {
        //             console.log(response)
        //             setQuestions(response.data.items)
        //         }
        //     ).catch((error)=>console.log(error))
        setQuestions([
                {
                    "comments": [
                        {
                            "score": 0,
                            "creation_date": 1614347998,
                            "comment_id": 117365375,
                            "body": "Those tasks are going to different queues. A timer won&#39;t fire before the current script is finished."
                        },
                        {
                            "score": 1,
                            "creation_date": 1614348004,
                            "comment_id": 117365380,
                            "body": "There are two different queues, the &quot;task queue&quot; and the &quot;microtask queue&quot;."
                        },
                        {
                            "score": 0,
                            "creation_date": 1614348140,
                            "comment_id": 117365433,
                            "body": "setTimeout function scheduled to run later. Please look at this similar question <a href=\"https://stackoverflow.com/questions/36904773/why-doesnt-settimeout-0-execute-immediately\" title=\"why doesnt settimeout 0 execute immediately\">stackoverflow.com/questions/36904773/&hellip;</a>"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614348246,
                            "comment_id": 117365485,
                            "body": "@maziyank this is different, both are lines are async code."
                        },
                        {
                            "score": 0,
                            "creation_date": 1614348275,
                            "comment_id": 117365500,
                            "body": "@Pointy oh ok didn&#39;t know that, so if I understand correctly we first execute non async code, then microtask queue then task queue ?"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614348862,
                            "comment_id": 117365780,
                            "body": "there is nothing in concern of queue or FIFO, this  just process priorities and js engine implementations"
                        }
                    ],
                    "answers": [
                        {
                            "score": 9,
                            "creation_date": 1614348188,
                            "answer_id": 66387206,
                            "body": "<p>There are 2 separate queues for handling of the callbacks. A <strong>macro</strong> and a <strong>micro</strong> queue. <code>setTimeout</code> enqueues an item in the <strong>macro</strong> queue, while promise resolution - to the <strong>micro</strong> queue. The currently executing macro task(the main script itself in this case) is executed synchronously, line by line until it is finished. The moment it is finished, the loop executes everything queued in the <strong>microtask</strong> queue before continuing with the next item from the <strong>macro</strong> queue(which in your case is the <code>console.log(&quot;hello&quot;)</code> queued from the <code>setTimeout</code>).</p>\n<p>Basically, the flow looks like this:</p>\n<ol>\n<li>Script starts executing.</li>\n</ol>\n<p>MacrotaskQueue: [], MicrotaskQueue: [].</p>\n<ol start=\"2\">\n<li><code>setTimeout(() =&gt; console.log(&quot;hello&quot;), 0);</code> is encountered which leads to pushing a new item in the macrotask queue.</li>\n</ol>\n<p>MacrotaskQueue: [<code>console.log(&quot;hello&quot;)</code>], MicrotaskQueue: [].</p>\n<ol start=\"3\">\n<li><code>Promise.resolve('Success!').then(console.log)</code> is read. Promise resolves to <code>Success!</code> immediately and <code>console.log</code> callback gets enqueued to the microtask queue.</li>\n</ol>\n<p>MacrotaskQueue: [<code>console.log(&quot;hello&quot;)</code>], MicrotaskQueue: [<code>console.log('Success!')</code>].</p>\n<ol start=\"4\">\n<li>The script finishes executing so it checks if there is something in the microtask queue before proceeding with the next task from the macro queue.</li>\n<li><code>console.log('Success!')</code> is pulled from the microtask queue and executed.</li>\n</ol>\n<p>MacrotaskQueue: [<code>console.log(&quot;hello&quot;)</code>], MicrotaskQueue: [].</p>\n<ol start=\"6\">\n<li>Script checks again if there is something else in the microtask queue. There is none, so it fetches the first available task from the macrotask queue and executes it, namely - <code>console.log(&quot;hello&quot;)</code>.</li>\n</ol>\n<p>MacrotaskQueue: [], MicrotaskQueue: [].</p>\n<ol start=\"7\">\n<li>After the script finishes executing the <code>console.log(&quot;hello&quot;)</code>, it once again checks if there is anything in the microtask queue. It is empty, so it checks the macrotask queue. It is empty as well so everything queued is executed and the script finishes.</li>\n</ol>\n<p>This is a simplified explanation, though, as it can get trickier. The microtask queue normally handles mainly promise callbacks, but you can enqueue code on it yourself. The newly added items in the microtask queue will still be executed before the next macrotask item. Also, microtasks can enqueue other microtasks, which can lead to an endless loop of processing microtasks.</p>\n<p>Some useful reference resources:</p>\n<ul>\n<li><a href=\"https://javascript.info/event-loop\" rel=\"nofollow noreferrer\">The event loop</a></li>\n<li><a href=\"https://javascript.info/microtask-queue\" rel=\"nofollow noreferrer\">Microtasks</a></li>\n<li><a href=\"https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide\" rel=\"nofollow noreferrer\">Using Microtasks</a></li>\n</ul>\n"
                        },
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614348482,
                                    "comment_id": 117365598,
                                    "body": "You have links to sources? I&#39;d like to read more about it"
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614348544,
                                    "comment_id": 117365636,
                                    "body": "@Tony everything is explained in detail here: <a href=\"https://javascript.info/event-loop\" rel=\"nofollow noreferrer\">javascript.info/event-loop</a>"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614381816,
                                    "comment_id": 117377720,
                                    "body": "You left out <a href=\"https://www.youtube.com/watch?v=1Dax90QyXgI&amp;t=17m54s\" rel=\"nofollow noreferrer\">articles</a> left and right. Is there only <i>one</i> microtask queue (<i>the</i> microtask queue) or are several possible?"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614426442,
                                    "comment_id": 117385190,
                                    "body": "@PeterMortensen i try to minimize grammatical errors when writing english but i am not a native english speaker. I appreciate you editing the answer to remove the grammatical mistakes. As far as your question regarding the microtask queue is concerned, in nodejs, there are two types of microtask queues, one holds the microtasks scheduled using <code>process.nextTick</code> and the other holds the microtasks scheduled using promises."
                                }
                            ],
                            "score": 7,
                            "creation_date": 1614348420,
                            "answer_id": 66387263,
                            "body": "<p>There's a different queue for promises known as a microtask queue or a job queue.</p>\n<p>A microtask queue is processed after:</p>\n<ul>\n<li>each callback as long as call-stack is empty.</li>\n<li>after each task.</li>\n</ul>\n<p>Also note that if a microtask in a microtask queue queues another microtask, that will also be processed <em>before</em> processing anything in the task queue.</p>\n<p>The following code snippet shows an example:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>setTimeout(() =&gt; console.log('hello'), 0);\n\nPromise.resolve('first microtask')\n  .then(res =&gt; {\n    console.log(res);\n    return Promise.resolve('second microtask');\n  })\n  .then(console.log);</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>In your code, callback function of <code>setTimeout</code> is added to the task queue and the <code>Promise.resolve</code> queues a micro-task in a microtask queue. This queue is processed at the end of the script execution. That is why &quot;success&quot; is logged before &quot;hello&quot;.</p>\n<p>The following image shows a step-by-step execution of your code:</p>\n<p><a href=\"https://i.stack.imgur.com/oRiJD.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/oRiJD.png\" alt=\"Enter image description here\" /></a></p>\n<p>Resources for further reading:</p>\n<ul>\n<li><p><em><a href=\"https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/\" rel=\"nofollow noreferrer\">Tasks, microtasks, queues and schedules</a></em></p>\n</li>\n<li><p><em><a href=\"https://careersjs.com/magazine/javascript-job-queue-microtask/\" rel=\"nofollow noreferrer\">JavaScript job queue and microtasks</a></em></p>\n</li>\n</ul>\n"
                        },
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614348987,
                                    "comment_id": 117365841,
                                    "body": "This is not quite true. Promise resolution happens in a different call stack than the currently-running macro task, so it&#39;s not executed &quot;immediately&quot;."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614349311,
                                    "comment_id": 117366010,
                                    "body": "I updated the answer so it will be clearer"
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614443881,
                                    "comment_id": 117389752,
                                    "body": "&quot;<i>Web APIs are threads that you can’t access</i>&quot; - that doesn&#39;t sound right. It might be intended as a gross simplification, but I don&#39;t think that helps."
                                }
                            ],
                            "score": 0,
                            "creation_date": 1614348878,
                            "answer_id": 66387394,
                            "body": "<p>Even though the timeout is 0, the callback function will still be added to the web API (after being fetched from the call stack). Web APIs are threads that you can’t access; you can just make calls like Ajax, Timeout, and the DOM.</p>\n<p>Promise.resolve schedules a microtask whereas setTimeout schedules a macrotask. Microtasks are executed before running the next macrotask.</p>\n<p>So in your example, the</p>\n<pre><code>Promise.resolve('Success!').then(console.log);\n</code></pre>\n<p>will be executed before the setTimout since promises have better priority than the setTimeout callback function in the event loop stack.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 9,
                    "creation_date": 1614347874,
                    "question_id": 66387109,
                    "title": "JavaScript async callbacks - Promise and setTimeout",
                    "body": "<p>In the following code:</p>\n<pre><code>setTimeout(() =&gt; console.log(&quot;hello&quot;), 0);\n\nPromise.resolve('Success!')\n  .then(console.log)\n</code></pre>\n<p>What should happen in my understanding:</p>\n<ol>\n<li>setTimeout is called =&gt; <code>print hello</code> directly added to callback queue as time is 0</li>\n<li>Promise.resolve =&gt; <code>print Success!</code> added to callback queue</li>\n</ol>\n<p>If I am not wrong, the callback queue is <a href=\"https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)\" rel=\"nofollow noreferrer\">FIFO</a>.</p>\n<p>But the code output is:</p>\n<pre><code>Success!\nhello\n</code></pre>\n<p>What is the explanation?</p>\n"
                },
                {
                    "comments": [
                        {
                            "score": 0,
                            "creation_date": 1614266621,
                            "comment_id": 117338676,
                            "body": "The map constructor takes in array of pairs - <code>string[]</code> does not contain any length or positional information. Both <code>[&#39;DE&#39;, &#39;GERMANY&#39;]</code> and <code>[&#39;DE&#39;, &#39;GERMANY&#39;, &#39;1&#39;, &#39;2&#39;, &#39;foo&#39;]</code> are valid <code>string[]</code> - but only the first one is valid to use with a map constructor"
                        },
                        {
                            "score": 2,
                            "creation_date": 1614266656,
                            "comment_id": 117338691,
                            "body": "Change the type of the array to <code>[string, string][]</code>"
                        }
                    ],
                    "answers": [
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614266951,
                                    "comment_id": 117338842,
                                    "body": "thanks for the answer, I have edited my var&#39;s name. And the second option also solved my issue."
                                }
                            ],
                            "score": 7,
                            "creation_date": 1614266603,
                            "answer_id": 66371443,
                            "body": "<p>If you dig through the log, you'll see an error message of</p>\n<blockquote>\n<p>Target requires 2 element(s) but source may have fewer.</p>\n</blockquote>\n<p>The problem is that <code>['DE', 'Germany']</code> gets automatically type-widened to <code>string[]</code> - an array of strings, which may have two elements, or one, or zero - but the Map constructor requires such entry arrays to have at least 2 elements. The type information that the number of items in the array is 2 gets lost.</p>\n<p>I'd put the array declaration on the same line as the <code>new Map</code>:</p>\n<pre><code>const myMap = new Map([['DE', 'Germany'], ['AU', 'Austria']]);\n</code></pre>\n<p>Another option is</p>\n<pre><code>const arr: [string, string][] = [['DE', 'Germany'], ['AU', 'Austria']];\n</code></pre>\n<p>to show that the array actually does have 2 items in it.</p>\n<p>Also note that you can't have a variable name start with a number - start it with something else, probably a letter.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 6,
                    "creation_date": 1614266358,
                    "question_id": 66371388,
                    "title": "Two dimensional array passed to new Map fails in typescript",
                    "body": "<p>Can't pass two dimensional array to <code>new Map</code> in Typescript:</p>\n<pre><code> const myArray: string[][] = [['DE', 'Germany'], ['AU', 'Austria']];\n const myMap = new Map(myArray);\n</code></pre>\n<p>Fails to me with <code>TS2769: No overload matches this call.</code>\nAm I doing something wrong here?</p>\n<p>TS Version 3.9.9</p>\n"
                },
                {
                    "answers": [
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614333657,
                                    "comment_id": 117359380,
                                    "body": "I&#39;m aware of concurrent mode and this is a great example. Unfortunately I can&#39;t use unstable APIs for my software at the moment, but thanks a lot!"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614343905,
                                    "comment_id": 117363639,
                                    "body": "@Bennett Dams Let&#39;s hope it comes out soon! You can never know with them... I&#39;ll try to think of a more stable answer. Note that there are some optimizations in my answer that help a bit with render times even without concurrent mode. Like using memo on the data.map inside of render."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614345323,
                                    "comment_id": 117364211,
                                    "body": "Could you elaborate? Also, what&#39;s the difference between the inline memo and a memo outside of the render?"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614502727,
                                    "comment_id": 117400677,
                                    "body": "@Bennett Dams It doesn&#39;t matter at all that useMemo it is inline or stored in a variable. Actually the whole function component is a big render step. The optimisation I did was to memoize the mapping from data to the react components array. So the take away is that it is very much possible to also memoize calculating JSX tags with useMemo, for very long inputs."
                                }
                            ],
                            "score": 2,
                            "creation_date": 1614276064,
                            "answer_id": 66374009,
                            "body": "<p>You can use (the currently experimental) React <a href=\"https://reactjs.org/docs/concurrent-mode-intro.html\" rel=\"nofollow noreferrer\">Concurrent Mode</a>.\nIn concurrent mode, rendering is none blocking.</p>\n<pre><code>export default function App() {\n  // imagine data coming from an async request\n  const [data, setData] = useState&lt;Data&gt;(() =&gt; createData());\n  const [startTransition, isPending] = unstable_useTransition();\n  function handleNoneBlockingClick() {\n    startTransition(() =&gt; setData(createData()));\n  }\n  function handleBlockingClick() {\n    setData(createData());\n  }\n  return (\n    &lt;div className=&quot;App&quot;&gt;\n      &lt;button onClick={handleNoneBlockingClick}&gt;\n        (None blocking) Regenerate data\n      &lt;/button&gt;\n      &lt;button onClick={handleBlockingClick}&gt;(Blocking) Regenerate data&lt;/button&gt;\n      {isPending &amp;&amp; &lt;div&gt;...pending&lt;/div&gt;}\n      {data &amp;&amp; (\n        &lt;&gt;\n          &lt;p&gt;\n            Number of data points to render:{&quot; &quot;}\n            {useMemo(\n              () =&gt;\n                data.lines.reduce((acc, item) =&gt; {\n                  return acc + item.data.length;\n                }, 0),\n              [data.lines]\n            ) +\n              useMemo(\n                () =&gt;\n                  data.areas.reduce((acc, item) =&gt; {\n                    return acc + item.data.length;\n                  }, 0),\n                [data.areas]\n              )}\n          &lt;/p&gt;\n          &lt;Animation /&gt;\n          &lt;Chart data={data} /&gt;\n        &lt;/&gt;\n      )}\n    &lt;/div&gt;\n  );\n}\n</code></pre>\n<p>In this example, I'm using the new unstable_useTransition hook, and startTransition whenever the button is clicked, for a none blocking calculation of the chart data.</p>\n<p>The animation is not in perfect 60fps, but the site is still responsive!</p>\n<p>See the differences in this fork of your code:</p>\n<p><a href=\"https://codesandbox.io/s/concurrent-mode-recharts-render-blocking-forked-m62kf?file=/src/App.tsx\" rel=\"nofollow noreferrer\">https://codesandbox.io/s/concurrent-mode-recharts-render-blocking-forked-m62kf?file=/src/App.tsx</a></p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 6,
                    "creation_date": 1614081259,
                    "question_id": 66332632,
                    "title": "React Recharts render blocking with a lot of data",
                    "body": "<p>I have a use case for Recharts where I'm rendering more than 20,000 data points, which results in a blocking render:</p>\n<p><strong><a href=\"https://codesandbox.io/s/recharts-render-blocking-2k1eh?file=/src/App.tsx\" rel=\"nofollow noreferrer\">CodeSandbox example</a></strong></p>\n<p><em>(The CodeSandbox has a small pulse animation, so it's easier to see the blocking render when creating new chart data.)</em></p>\n<p>When measuring the performance with dev tools, it is clear that the cause for this is not the browser's <code>painting</code> or <code>rendering</code> activity, but Recharts' <code>scripting</code> activity:</p>\n<p><a href=\"https://i.stack.imgur.com/ug1k1.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/ug1k1.png\" alt=\"performance\" /></a></p>\n<p>By no means do I want to blame Recharts here, 20k points is a lot, but does anyone know if there's a way around the blocking render?\nI tried to incrementally load more data (e.g. 2k + 2k + 2k + ... = 20k), which just results in more, smaller render blocking moments.</p>\n<hr />\n<p><strong>Code of the chart:</strong>\n<em>(see CodeSandbox for full code)</em></p>\n<pre><code>function Chart({ data }: { data: Data }) {\n  console.log(&quot;⌛ Rendering chart&quot;);\n\n  const lineData = useMemo(() =&gt; {\n    return data.lines;\n  }, [data.lines]);\n\n  const areaData = useMemo(() =&gt; {\n    return data.areas;\n  }, [data.areas]);\n\n  return (\n    &lt;ComposedChart\n      width={500}\n      height={400}\n      margin={{\n        top: 20,\n        right: 20,\n        bottom: 20,\n        left: 20\n      }}\n    &gt;\n      &lt;CartesianGrid stroke=&quot;#f5f5f5&quot; /&gt;\n      &lt;XAxis dataKey=&quot;ts&quot; type=&quot;number&quot; /&gt;\n      &lt;YAxis /&gt;\n      &lt;Tooltip /&gt;\n      {areaData.map((area) =&gt; (\n        &lt;Area\n          // @ts-ignore\n          data={area.data}\n          dataKey=&quot;value&quot;\n          isAnimationActive={false}\n          key={area.id}\n          type=&quot;monotone&quot;\n          fill=&quot;#8884d8&quot;\n          stroke=&quot;#8884d8&quot;\n        /&gt;\n      ))}\n      {lineData.map((line) =&gt; (\n        &lt;Line\n          data={line.data}\n          dataKey=&quot;value&quot;\n          isAnimationActive={false}\n          key={line.id}\n          type=&quot;monotone&quot;\n          stroke=&quot;#ff7300&quot;\n        /&gt;\n      ))}\n    &lt;/ComposedChart&gt;\n  );\n}\n</code></pre>\n"
                },
                {
                    "answers": [
                        {
                            "score": 3,
                            "creation_date": 1614377461,
                            "answer_id": 66393408,
                            "body": "<pre><code>setCounters({ counterss })\n</code></pre>\n<p>should be</p>\n<pre><code>setCounters(counterss)\n</code></pre>\n"
                        },
                        {
                            "score": 5,
                            "creation_date": 1614377468,
                            "answer_id": 66393409,
                            "body": "<p>The main culprit appears to be the way you are updating your state, which is like this:</p>\n<pre><code>setCounters({ counterss });\n</code></pre>\n<p>This will actually set your <code>counters</code> state to an object with the property <code>counterss</code>, so your state will contain the following:</p>\n<pre><code>{ counterss: [/* rest of the array */] }\n</code></pre>\n<p>The exact error being thrown is referring to the fact that you are attempting to call <code>.filter</code> on an object instead of an array. To fix this issue you should simply update your state like this:</p>\n<pre><code>setCounters(counterss);\n</code></pre>\n"
                        },
                        {
                            "score": 3,
                            "creation_date": 1614377504,
                            "answer_id": 66393411,
                            "body": "<p>It throws an error because you set the new state as an object <code>setCounters({ counterss });</code>. But you want an array: <code>setCounters(counterss);</code>. This way it won't throw an error the second time <code>setCounters</code> is called.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 5,
                    "creation_date": 1614377038,
                    "question_id": 66393346,
                    "title": "Convert class component to functional component in React",
                    "body": "<p>I'm learning React hooks so in order to do that I'm trying to convert a class component to a functional component but I still get some errors.</p>\n<p>Here is the original working component written as a class:</p>\n<pre><code>import React, { Component } from 'react';\nimport NavBar from './components/navbar';\nimport Counters from './components/counters';\n\nclass App extends Component {\n  state = {\n    counters: [\n      { id: 0, value: 5 },\n      { id: 1, value: 1 },\n      { id: 2, value: 2 },\n    ],\n  };\n\n  handleDelete = (counterId) =&gt; {\n    const counters = this.state.counters.filter((c) =&gt; c.id !== counterId);\n    this.setState({ counters });\n  };\n\n  handleReset = () =&gt; {\n    const counters = this.state.counters.map((c) =&gt; {\n      c.value = 0;\n      return c;\n    });\n    this.setState({ counters });\n  };\n\n  handleIncrement = (counter) =&gt; {\n    const counters = [...this.state.counters];\n    const index = counters.indexOf(counter);\n    counters[index] = { ...counter };\n    counters[index].value++;\n    this.setState({ counters });\n  };\n  render() {\n    return (\n      &lt;React.Fragment&gt;\n        &lt;NavBar\n          totalCounters={this.state.counters.filter((c) =&gt; c.value &gt; 0).length}\n        /&gt;\n        &lt;main className='container'&gt;\n          &lt;Counters\n            counters={this.state.counters}\n            onReset={this.handleReset}\n            onDelete={this.handleDelete}\n            onIncrement={this.handleIncrement}\n          /&gt;\n        &lt;/main&gt;\n      &lt;/React.Fragment&gt;\n    );\n  }\n}\n\nexport default App;\n</code></pre>\n<p>And this is the converted version which uses hooks.</p>\n<pre><code> import React, { useState } from 'react';\n    import NavBar from './components/navbar';\n    import Counters from './components/counters';\n    \n    const App = () =&gt; {\n      const [counters, setCounters] = useState([\n        { id: 0, value: 5 },\n        { id: 1, value: 1 },\n        { id: 2, value: 2 },\n      ]);\n    \n      const handleDelete = (counterId) =&gt; {\n        const counterss = counters.filter((c) =&gt; c.id !== counterId);\n        setCounters({ counterss });\n      };\n    \n      const handleReset = () =&gt; {\n        const counterss = counters.map((c) =&gt; {\n          c.value = 0;\n          return c;\n        });\n        setCounters({ counterss });\n      };\n    \n      const handleIncrement = (counter) =&gt; {\n        const counterss = [...counters];\n        const index = counterss.indexOf(counter);\n        counterss[index] = { ...counter };\n        counterss[index].value++;\n        setCounters({ counterss });\n      };\n    \n      return (\n        &lt;React.Fragment&gt;\n          &lt;NavBar totalCounters={counters.filter((c) =&gt; c.value &gt; 0).length} /&gt;\n          &lt;main className='container'&gt;\n            &lt;Counters\n              counters={counters}\n              onReset={handleReset}\n              onDelete={handleDelete}\n              onIncrement={handleIncrement}\n            /&gt;\n          &lt;/main&gt;\n        &lt;/React.Fragment&gt;\n      );\n    };\n    \n    export default App;\n</code></pre>\n<p>Most of it works fine but it keeps throwing an error saying that filter is not a function. Here it is the message:</p>\n<blockquote>\n<p>TypeError: counters.filter is not a function</p>\n</blockquote>\n"
                },
                {
                    "answers": [
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614459198,
                                    "comment_id": 117393957,
                                    "body": "It gives the same result with and without the <code>&amp;&amp;</code>"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614459250,
                                    "comment_id": 117393972,
                                    "body": "I think it&#39;s the <code>start-server-and-test</code> that is causing the issue"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614459609,
                                    "comment_id": 117394048,
                                    "body": "this does not work either <code>&quot;cy:percy:local&quot;: &quot;yarn start:server &#39;yarn percy:local; yarn percy:exec&#39;&quot;</code>"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614517111,
                                    "comment_id": 117403853,
                                    "body": "I can&#39;t comment on <code>yarn start:server</code>, let&#39;s remove the unknowns, can you run it as 2 separate commands? In one do <code>yarn start:server</code> and in the next do <code>yarn percy:local yarn percy:exec</code>. This does work for me in OS X. Note: If <code>yarn start:server</code> is a long-running process, better run it as a background process or run it in the different thread / different terminal."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614517589,
                                    "comment_id": 117403988,
                                    "body": "I made another script <code>&quot;percy:run&quot;: &quot;yarn percy:local; yarn percy:exec&quot;</code> and did a <code>yarn start</code> in one terminal and a <code>yarn percy:run</code> in another. It still says that the token is not set"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614519439,
                                    "comment_id": 117404443,
                                    "body": "As a check can you try running <code>PERCY_TOKEN=asdfasdf PERCY_BRANCH=local yarn percy exec -- cypress run</code>? This has env vars and run commands in the same script. Do not put <code>;</code> between variables."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614519805,
                                    "comment_id": 117404526,
                                    "body": "<code>$ PERCY_TOKEN=$(grep &#39;PERCY_TOKEN.*&#39; .env | sed &#39;s&#47;.*=&#47;&#47;&#39;) PERCY_BRANCH=local yarn percy exec cypress run</code> works fine from the terminal"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614520228,
                                    "comment_id": 117404630,
                                    "body": "Yeah, pass env vars as part of the command instead of running it as a separate yarn script. When run separately they run in two isolated processes."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614520364,
                                    "comment_id": 117404666,
                                    "body": "Sorry I don&#39;t understand what you mean"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614520633,
                                    "comment_id": 117404736,
                                    "body": "As explained in the 2nd point of this answer: <a href=\"https://stackoverflow.com/a/37141993/8266093\">stackoverflow.com/a/37141993/8266093</a> I would suggest you run this script in the format <code>ENV_KEY1=value1 ENV_KEY2=value2 command</code> which in your case becomes  <code>PERCY_TOKEN=$(grep &#39;PERCY_TOKEN.*&#39; .env | sed &#39;s&#47;.*=&#47;&#47;&#39;) PERCY_BRANCH=local yarn percy exec cypress run</code> which as you just mentioned is working fine."
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614536673,
                                    "comment_id": 117409452,
                                    "body": "🙏 I finally got it working with <code>&quot;percy:local&quot;: &quot;PERCY_TOKEN=$(grep &#39;PERCY_TOKEN.*&#39; .env | sed &#39;s&#47;.*=&#47;&#47;&#39;) PERCY_BRANCH=local yarn start:server &#39;percy exec cypress run&#39;&quot;</code> - if you add that to your answer I&#39;ll mark it as the solution."
                                }
                            ],
                            "score": 2,
                            "creation_date": 1614429904,
                            "answer_id": 66398934,
                            "body": "<p>yarn internally uses <code>sh</code> to execute the commands given in the scripts (<code>cmd</code> in case of windows) - <a href=\"https://github.com/yarnpkg/yarn/blob/a4708b29ac74df97bac45365cba4f1d62537ceb7/src/cli/commands/run.js#L136\" rel=\"nofollow noreferrer\">Source</a>. This is very similar to what <a href=\"https://stackoverflow.com/a/35733742/8266093\">npm does as well</a>.</p>\n<p>Here <code>&amp;&amp;</code> is handled by a shell, so your command <code>yarn percy:local &amp;&amp; yarn start:server percy:exec</code> is run as 2 separate child processes. This means <code>yarn percy:local</code> runs in a process and sets the env variables as desired in its context but the second process which is running <code>yarn start:server percy:exec</code> has no idea about the env variables set by process 1.</p>\n<p>Lets see how OS X handles this:</p>\n<ol>\n<li>With <code>&amp;&amp;</code></li>\n</ol>\n<pre><code>sh -c 'PERCY_TOKEN=asdfasdf; PERCY_BRANCH=local' &amp;&amp;  sh -c 'echo $PERCY_TOKEN'\n</code></pre>\n<p>This prints nothing</p>\n<ol start=\"2\">\n<li>Without <code>&amp;&amp;</code></li>\n</ol>\n<pre><code>sh -c 'PERCY_TOKEN=asdfasdf; PERCY_BRANCH=local echo $PERCY_TOKEN'\n</code></pre>\n<p>This prints <code>asdfasdf</code></p>\n<p>I think removing the <code>&amp;&amp;</code> in the <code>cy:percy:local</code> should fix your issue.</p>\n<p><strong>Edit: Solution for your particular situation as discussed in comments</strong></p>\n<p>As explained in the 2nd point of this answer: stackoverflow.com/a/37141993/8266093 I would suggest you run this script in the format <code>ENV_KEY1=value1 ENV_KEY2=value2 command</code> which in your case becomes <code>PERCY_TOKEN=$(grep 'PERCY_TOKEN.*' .env | sed 's/.*=//') PERCY_BRANCH=local yarn percy exec cypress run</code>. Along with this, you can add your start-server yarn command as well if running it separately is not a solution for you.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 5,
                    "creation_date": 1614083819,
                    "question_id": 66333245,
                    "title": "NodeJS: NOT able to set PERCY_TOKEN via package script with start-server-and-test",
                    "body": "<p>I have been trying really hard to set the <code>PERCY_TOKEN</code> on a local test run according the official <a href=\"https://docs.percy.io/docs/local-development\" rel=\"nofollow noreferrer\">guideline from percy</a> and trigger it via <code>yarn</code>.</p>\n<p>The guideline says:</p>\n<pre><code>$ PERCY_TOKEN=aaabbbcccdddeeefff PERCY_BRANCH=local npm test\n</code></pre>\n<p>My attempt right now looks like this:</p>\n<blockquote>\n<p>package.json</p>\n</blockquote>\n<pre class=\"lang-json prettyprint-override\"><code>\n...\n&quot;scripts&quot;: {\n    &quot;start&quot;: &quot;react-scripts -r @cypress/instrument-cra start&quot;,\n    &quot;start:silent&quot;: &quot;BROWSER=none yarn start&quot;,\n    &quot;start:server&quot;: &quot;start-server-and-test start:silent http://localhost:3000&quot;,\n    &quot;build&quot;: &quot;react-scripts build&quot;,\n    &quot;eject&quot;: &quot;react-scripts eject&quot;,\n    &quot;envGenerateExample&quot;: &quot;cat .env | sed 's/=.*/=/g' &gt; .env.example&quot;,\n    &quot;jest:test&quot;: &quot;react-scripts test --env=jest-environment-jsdom-sixteen&quot;,\n    &quot;cy:run&quot;: &quot; 'yarn start:server './node_modules/.bin/cypress run'&quot;,\n    &quot;cy:open&quot;: &quot;yarn start:server './node_modules/.bin/cypress open'&quot;,\n    &quot;cy:ci&quot;: &quot;yarn start:server cy:chrome&quot;,\n    &quot;cy:chrome&quot;: &quot;cypress run --browser chrome --record&quot;,\n    &quot;percy:exec&quot;: &quot;yarn percy exec -- cypress run&quot;,\n    &quot;cy:percy&quot;: &quot;yarn start:server percy:exec&quot;,\n    &quot;percy:local&quot;: &quot;PERCY_TOKEN=$(grep 'PERCY_TOKEN.*' .env | sed 's/.*=//'); PERCY_BRANCH=local;&quot;,\n    &quot;cy:percy:local&quot;: &quot;yarn percy:local &amp;&amp; yarn start:server percy:exec&quot;\n  },\n...\n</code></pre>\n<pre class=\"lang-sh prettyprint-override\"><code>$ yarn cy:percy:local\n\nCompiled successfully!\n\nYou can now view playground in the browser.\n\n  Local:            http://localhost:3000\n  On Your Network:  http://192.168.1.163:3000\n\nNote that the development build is not optimized.\nTo create a production build, use yarn build.\n\n...\n\n&gt; playground@0.2.0 percy:exec /Users/norfeldt/Repos/playground\n&gt; yarn percy exec -- cypress run\n\nwarning From Yarn 1.0 onwards, scripts don't require &quot;--&quot; for options to be forwarded. In a future version, any explicit &quot;--&quot; will be forwarded as-is to the scripts.\n$ /Users/norfeldt/Repos/playground/node_modules/.bin/percy exec cypress run\n ›   Warning: Skipping visual tests. PERCY_TOKEN was not provided.\n...\n</code></pre>\n<h1>TL;DR solution</h1>\n<blockquote>\n<p>package.json</p>\n</blockquote>\n<pre class=\"lang-json prettyprint-override\"><code>\n...\n&quot;scripts&quot;: {\n    &quot;start&quot;: &quot;react-scripts -r @cypress/instrument-cra start&quot;,\n    &quot;start:silent&quot;: &quot;BROWSER=none yarn start&quot;,\n    &quot;start:server&quot;: &quot;start-server-and-test start:silent http://localhost:3000&quot;,\n    ...\n    &quot;percy:local&quot;: &quot;PERCY_TOKEN=$(grep 'PERCY_TOKEN.*' .env | sed 's/.*=//') PERCY_BRANCH=local yarn start:server 'percy exec cypress run'&quot;\n  },\n...\n</code></pre>\n"
                },
                {
                    "comments": [
                        {
                            "score": 0,
                            "creation_date": 1614197941,
                            "comment_id": 117315692,
                            "body": "Talking with the creator of Yup about this here: <a href=\"https://github.com/jquense/yup/issues/1280\" rel=\"nofollow noreferrer\">github.com/jquense/yup/issues/1280</a>"
                        }
                    ],
                    "is_answered": false,
                    "score": 5,
                    "creation_date": 1614176822,
                    "question_id": 66352858,
                    "title": "Accessing the &quot;final&quot; schema and extracting it&#39;s rules",
                    "body": "<p>Let's say I have the following schema (one of the examples in Yup's documentation):</p>\n<pre class=\"lang-js prettyprint-override\"><code>let schema = object({\n  isSpecial: boolean(),\n  isBig: boolean(),\n  count: number().when(['isBig', 'isSpecial'], {\n    is: true, // alternatively: (isBig, isSpecial) =&gt; isBig &amp;&amp; isSpecial\n    then: yup.number().min(5),\n    otherwise: yup.number().min(0),\n  }),\n});\n\nconst result = schema.validateSync({\n  isBig: true,\n  isSpecial: true,\n  count: 10,\n});\n</code></pre>\n<p>The <code>count</code>'s min value depends on the value of <code>isBig</code>. That value is decided at runtime, when calling validate().\nIs there a way I can somehow access the &quot;final&quot; schema and programatically check what Yup decided to enforce?</p>\n<p>Something like:</p>\n<pre class=\"lang-js prettyprint-override\"><code>const { result, finalSchema } = schema.validateSync({\n  isBig: true,\n  isSpecial: true,\n  count: 10,\n});\n\nconsole.log(finalSchema.count.min) // 5\n</code></pre>\n"
                },
                {
                    "comments": [
                        {
                            "score": 0,
                            "creation_date": 1614409721,
                            "comment_id": 117381513,
                            "body": "Out of curiosity, what leads you to conclude that the numbers are successfully incrementing if the value of the string does not change?"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614409970,
                            "comment_id": 117381554,
                            "body": "I just added a commented-out line in my code above demonstrating which line I gathered that insight from"
                        }
                    ],
                    "answers": [
                        {
                            "score": 3,
                            "creation_date": 1614410253,
                            "answer_id": 66396488,
                            "body": "<p>You can't actually set the character of a string at a specific index using something like <code>notes[i] = &quot;a&quot;</code>. What you can do is split the string into an array, change the values in that array, and then join it back together into a string when you're done.</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>function is_numeric(str){\n    return /^\\d+$/.test(str);\n}\n\nfunction change_octave(notesStr,split_point){\n  const notes = notesStr.split('');\n  for(var i=(split_point-1);i&lt;notes.length;i++){\n    if(is_numeric(notes[i])==true){\n      const newValue = parseInt(notes[i]) + 1;\n      notes[i] = '' + newValue;\n    }\n    if(notes[i]=='/'||notes[i]=='x'){\n      i = i+3;\n    }\n  }\n  return notes.join('');\n}\nvar notes = \"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\";\nconsole.log(change_octave(notes,4));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n"
                        },
                        {
                            "score": 1,
                            "creation_date": 1614410632,
                            "answer_id": 66396526,
                            "body": "<p>You can't change the character in the string by index directly. For example:</p>\n<pre><code>   notes=&quot;aaa&quot;\n   notes[1] = &quot;b&quot;\n   console.log(notes)\n</code></pre>\n<p>The solution is:\n<div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>function is_numeric(str){\n    return /^\\d+$/.test(str);\n}\n\n\nfunction change_octave(notes,split_point){\n  modified_notes = notes.split('')\n  for(var i=(split_point-1);i&lt;notes.length;i++){\n    if(is_numeric(notes[i])==true){\n      modified_notes[i]=''+(parseInt(notes[i])+1);\n      //console.log(parseInt(notes[i])+1) //these numbers are incrementing\n    }\n    if(notes[i]=='/'||notes[i]=='x'){\n      i = i+3;\n    }\n  }\n  \n  return  modified_notes.join('')  \n}\nvar notes = \"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\";\nconsole.log(change_octave(notes,4));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n"
                        },
                        {
                            "score": 1,
                            "creation_date": 1614411453,
                            "answer_id": 66396614,
                            "body": "<p>In JavaScript, a string is a primitive type and is therefore immutable. By default, in so-called <a href=\"https://developer.mozilla.org/en-US/docs/Glossary/Sloppy_mode\" rel=\"nofollow noreferrer\">&quot;sloppy mode&quot;</a>, assigning a value to an element of a string silently fails, but in <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode\" rel=\"nofollow noreferrer\">strict mode</a> it will throw an error:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>\"use strict\";\nlet notes = \"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\";\nnotes[4] = \"o\";</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>In order to accomplish this, I would suggest making use of <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace\" rel=\"nofollow noreferrer\"><code>String.prototype.replace()</code></a> like this:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>function change_octave(notes, split_point) {\n  return notes.replace(/\\d+/g, (str, i) =&gt; {\n    if (--split_point &gt; 0) {\n      return str;\n    }\n\n    if (i &gt; 0 &amp;&amp; (notes[i - 1] === '/' || notes[i - 1] === 'x')) {\n      return str;\n    }\n\n    return Number(str) + 1;\n  });\n}\n\nlet notes = \"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\";\n\nconsole.log(change_octave(notes, 4));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n"
                        },
                        {
                            "score": 1,
                            "creation_date": 1614411606,
                            "answer_id": 66396624,
                            "body": "<p>I modified your code a bit, and I think it works now!</p>\n<pre><code> function is_numeric(str) {\n        return /^\\d+$/.test(str);\n    }\n\n    function change(note, point) {\n        var arr = note.split(&quot;&quot;)\n        var ind = note.indexOf(point)\n        ind = ind + point.length -1;\n        for (var i = 0; i &lt; arr.length; i++) {\n            if (i &gt; ind &amp;&amp; is_numeric(arr[i])) {\n                if (arr[i - 1] !== undefined &amp;&amp; arr[i - 1] !== &quot;/&quot; &amp;&amp; arr[i - 1] !== &quot;x&quot;) {\n                    arr[i] = &quot;&quot; + (parseInt(arr[i]) + 1);\n                }\n            }\n        }\n        return arr.join(&quot;&quot;)\n    }\n    var notes = &quot;do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4&quot;;\n    console.log(change(notes, &quot;do3mi3so3&quot;))\n</code></pre>\n<p>Output:</p>\n<pre><code>do3mi3so3 la4 ti5 do6 re6 mi6 /2 x2 fa5\n</code></pre>\n<hr />\n<p>If you want to use index position as point, then</p>\n<pre><code>function change(note, point) {\n        var arr = note.split(&quot;&quot;)\n        var ind = point\n        for (var i = 0; i &lt; arr.length; i++) {\n            if (i &gt; ind &amp;&amp; is_numeric(arr[i])) {\n                if (arr[i - 1] !== undefined &amp;&amp; arr[i - 1] !== &quot;/&quot; &amp;&amp; arr[i - 1] !== &quot;x&quot;) {\n                    arr[i] = &quot;&quot; + (parseInt(arr[i]) + 1);\n                }\n            }\n        }\n        return arr.join(&quot;&quot;)\n    }\n</code></pre>\n"
                        },
                        {
                            "score": 1,
                            "creation_date": 1614431129,
                            "answer_id": 66399101,
                            "body": "<p>If you want to increment the specific part of the example string, you might use a pattern to list the exact matches <code>\\b([ds]o|re|mi|fa|la|ti)\\b</code> and use word boundaries to prevent partial matches.</p>\n<p>In the callback of <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter\" rel=\"nofollow noreferrer\">replace</a>, you can increment the group match for the digits.</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>let regex = /\\b([ds]o|re|mi|fa|la|ti)(\\d+)\\b/g;\nconst change_octave = notes =&gt; notes.replace(regex, (_, g1, g2) =&gt; g1 + ++g2);\n\nconsole.log(change_octave(\"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\"));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>For specifying the point as the number of characters that should be after the start of the string, you could use a lookbehind for which is this <a href=\"https://caniuse.com/js-regexp-lookbehind\" rel=\"nofollow noreferrer\">browser support</a> and a dynamic pattern to set the <code>point</code></p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>const change_octave = (notes, point) =&gt; {\n  let regex = new RegExp(`(?&lt;=^.{${point}}.*\\\\b(?:[ds]o|re|mi|fa|la|ti))\\\\d+\\\\b`, \"g\");\n  return notes.replace(regex, m =&gt; ++m);\n}\n\nconsole.log(change_octave(\"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\", 4));\nconsole.log(change_octave(\"la3 ti4 do5 re5 mi5 /2 x2 fa4\", 4));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 4,
                    "creation_date": 1614408985,
                    "question_id": 66396359,
                    "title": "Incrementing specific numbers contained within a string",
                    "body": "<p>I'm working with strings that look like this:</p>\n<pre><code>&quot;do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4&quot;\n</code></pre>\n<p>I'd like to increment each number in the string past a specific point exempting numbers next to '/' or 'x'. For example, if I want to increment all the numbers of the aforementioned string past the point do3mi3so3, I'd expect to get this:</p>\n<pre><code>&quot;do3mi3so3 la4 ti5 do6 re6 mi6 /2 x2 fa5&quot;\n</code></pre>\n<p>Here is my code:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>function is_numeric(str){\n    return /^\\d+$/.test(str);\n}\n\n\nfunction change_octave(notes,split_point){\n  for(var i=(split_point-1);i&lt;notes.length;i++){\n    if(is_numeric(notes[i])==true){\n      notes[i]='' + parseInt(notes[i])+1;\n      //console.log(parseInt(notes[i])+1) //these numbers are incrementing\n    }\n    if(notes[i]=='/'||notes[i]=='x'){\n      i = i+3;\n    }\n  }\n  return notes;\n}\nvar notes = \"do3mi3so3 la3 ti4 do5 re5 mi5 /2 x2 fa4\";\nconsole.log(change_octave(notes,4));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>Despite the numbers successfully incrementing, the value of the string does not change.</p>\n<p>Thanks.</p>\n"
                },
                {
                    "comments": [
                        {
                            "score": 3,
                            "creation_date": 1614315132,
                            "comment_id": 117353577,
                            "body": "There are several confusing things in your question that I think show some misconceptions about what is happening.  First, &quot;statements&quot; are not ever placed into the event queue.  When an asynchronous task finishes running or when it is time for a timer to run, then something is inserted in the event queue.  Nothing is in the queue before that.  Right after you call <code>setTimeout()</code>, there is nothing in the event queue.  Second, &quot;events&quot; are not executed.  Functions are executed.  Calling a function may then cause something to be inserted into the event queue, either now or later."
                        }
                    ],
                    "answers": [
                        {
                            "score": 3,
                            "creation_date": 1614306772,
                            "answer_id": 66379303,
                            "body": "<p>If we break down the second case so that each function is on its own we end up with</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>const handleResolved = (data) =&gt; {\n  console.log(data);\n}\nconst promiseBody = (resolve, reject) =&gt; setTimeout( innerPromiseTimeout, 0, resolve );\nconst innerPromiseTimeout = (resolve) =&gt; setTimeout( resolveWith1, 0, resolve );\nconst resolveWith1 = (resolve) =&gt; resolve(\"1\");\nconst timeoutLog2 = () =&gt; {\n  console.log(\"2\");\n};\n\n// beginning of execution\n// timers stack: [ ]\n\n// promiseBody is executed synchronously\nlet p = new Promise( promiseBody );\n// timers stack: [ innerPromiseTimeout ]\n\n// this will happen only after resolveWith1 is called\np.then( handleResolved );\n// timers stack: [ innerPromiseTimeout ]\n\nsetTimeout( timeoutLog2, 0 );\n// timers stack: [ innerPromiseTimeout, timeoutLog2 ]\n\n// some time later, innerPromiseTimeout is called\n// timers stack: [ timeoutLog2, resolveWith1 ]\n\n// timeoutLog2 is called\n// timers stack: [ resolveWith1 ]\n\n// resolveWith1 is called and then is executed in next microtask checkpoint\n// timers stack: [ ]</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p><em>Also note that <code>setTimeout</code> still has a minimum of 1ms in Chrome (they will soon remove it, but for the time being, it's there), so don't assume <code>setTimeout(fn,0)</code> will execute as the next task</em></p>\n"
                        },
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614387306,
                                    "comment_id": 117378660,
                                    "body": "1. There is not one &quot;event-queue&quot;, the event-loop has many &quot;task-queues&quot; and yes parsing of script also gets pushed in one of these. 2. The js engine has nothing to do with <code>setTimeout</code>, timeouts are an environment construct. So yes in nodejs the event-loop logic is actually written in js, but even then it&#39;s not in the js engine (v8) but in the env (nodejs). 3. Functions are not &quot;executed&quot;, they are &quot;called&quot;, even you say it right after... Tasks are executed and since OP took &quot;event&quot; to mean &quot;task&quot; as hinted by &quot;event-queue&quot; instead of &quot;task-queue&quot;, they were right in their use of &quot;executed&quot;."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614387335,
                                    "comment_id": 117378667,
                                    "body": "4. There is no such thing as a &quot;promise-related event&quot; and if by this you meant &quot;microtasks&quot; in a browser or &quot;promiseJobReaction&quot; in ES nomenclature, then they are not affected by any priority system at all, but I already told you that before (b.t.w. why asking for comments explaining what you did wrong if you are not willing to change anyway?)."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614389580,
                                    "comment_id": 117379018,
                                    "body": "@Kaiido - Who said I&#39;m not willing to improve the answer?  This is the first feedback I&#39;ve received on this question at all.  I will work on it later this evening (cooking dinner now).  An answer like this tries to draw a balance between explaining things simply so one not familiar with these concepts can still follow the general logic of how it works.  A full treatise on this topic would be a chapter in a book.  Obviously we&#39;re not trying to go into that level of detail.  Drawing that balance is difficult.  I didn&#39;t want to go into the details of separate queues and micro tasks."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614389888,
                                    "comment_id": 117379064,
                                    "body": "Your answer is exactly saying that OP didn&#39;t used the correct wordings, the least we can expect from it is that this answer does. And regarding my final comment I was talking about our previous comment thread <a href=\"https://stackoverflow.com/a/39990322/3702797\">here</a>  where you already made wrong assertions about this subject matter that you still don&#39;t seem to understand plainly."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614390722,
                                    "comment_id": 117379200,
                                    "body": "@Kaiido - Using ES spec nomenclature is not always the best way to explain something to one who has never heard any of those terms.  If we had several pages of explanation to introduce and define those terms, that would all work fine.  But sometimes using simpler concepts the OP will already know is a better way to convey how it works even if it doesn&#39;t use the same terms as are used in the spec.  Anyway that was my idea here.  I will work on incorporating your feedback later tonight."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614390808,
                                    "comment_id": 117379216,
                                    "body": "@Kaiido - For example describing an event queue that prioritizes promise events is a simpler concept at the high level than describing how there are many different queues and then trying to explain how the event loop logic decides which queue to get the next event from.  At some deeper level of understanding, you have to go into the separate queues, but not always at the higher level.  Anyway, that&#39;s the balance I try to draw in explaining things using known terms in a way the OP would understand.  I&#39;ll look at each point of your feedback."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614418857,
                                    "comment_id": 117383315,
                                    "body": "@Kaiido - Responding to your points of feedback and some terminology in the answer cleaned up.  1. Yes, there are multiple queues.  That is referenced in the answer.  Parsing of the script isn&#39;t something that was raised in the question and didn&#39;t seem to me to be pertinent to the answer.  That happens and completes long before any of the OP&#39;s code runs.  2. I changed &quot;JS engine&quot; to &quot;JS environment&quot; in the answer.  3. Code in functions is executed.  4. I changed &quot;promise-related events&quot; to use different terminology."
                                }
                            ],
                            "score": 4,
                            "creation_date": 1614315744,
                            "answer_id": 66380396,
                            "body": "<p>There are several confusing things in your question that I think show some misconceptions about what is happening so let's cover those initially.</p>\n<p>First, &quot;statements&quot; are not ever placed into the event queue.  When an asynchronous task finishes running or when it is time for a timer to run, then something is inserted in the event queue.  Nothing is in the queue before that.  Right after you call <code>setTimeout()</code>, before the time has come for the <code>setTimeout()</code> to fire there is nothing in the event queue.</p>\n<p>Instead, <code>setTimeout()</code> runs synchronously, configures a timer in the internals of the JS environment, associates the callback function you passed to <code>setTimeout()</code> to that timer and then immediately returns where JS execution continues on the next line of code.  Sometime later when the time has been reached for the timer to fire and control has returned back to the event loop, the event loop will call the callback for that timer.  The internals of exactly how this works vary a bit according to which Javascript environment it is, but they all have the same effect relative to other things going on in the JS environment.  In nodejs, for example, nothing is ever actually inserted into the event queue itself.  Instead, there are phases of the event loop (different things to check to see if there's something to run) and one of the phases is to check to see if the current time is at or after the time that the next timer event is scheduled for (the soonest timer that has been scheduled).  In nodejs, timers are stored in a sorted linked list with the soonest timer at the head of the list.  The event loop compares the current time with the timer on the timer at the head of the list to see if its time to execute that timer yet or not.  If not, it goes about its business looking for other types of events in the various queues.  If so, it grabs the callback associated with that timer and calls the callback.</p>\n<p>Second, &quot;events&quot; are things that cause callback functions to get called and the code in that callback function is executed.</p>\n<p>Calling a function that may then cause something to be inserted into the event queue, either immediately or later (depending upon the function).  So, when <code>setTimeout()</code> is executed, it schedules a timer and some time later, it will cause the event loop to call the callback associated with that timer.</p>\n<p>Third, there is not just a single event queue for every type of event.  There are actually multiple queues and there are rules about what gets to run first if there are multiple different types of things waiting to run.  For example, when a promise is resolved or rejected and thus has registered callbacks to call, those promise jobs get to run before timer related callbacks.  Promises actually have their own separate queue for resolved or rejected promises waiting to call their appropriate callbacks.</p>\n<p>Fourth, <code>setTimeout()</code>, even when given a <code>0</code> time, always calls its callback in some future tick of the event loop.  It never runs synchronously or immediately.  So, the rest of the current thread of Javascript execution always finishes running before a <code>setTimeout()</code> callback ever gets called.  Promises also always call <code>.then()</code> or <code>.catch()</code> handlers after the current thread of execution finishes and control returns back to the event loop.  Pending promise operations in the event queues always get to run before any pending timer events.</p>\n<p>And to confuse things slightly, the Promise executor function (the callback <code>fn</code> you pass as in <code>new Promise(fn)</code>) does run synchronously.  The event loop does not participate in running <code>fn</code> there.  <code>new Promise()</code> is executed and that promise constructor immediately calls the executor callback function you passed to the promise constructor.</p>\n<p>Now, lets look at your first code block:</p>\n<pre><code>let handleResolved = (data) =&gt; {\n  console.log(data);\n}\n\nlet p = new Promise((resolve, reject) =&gt; {\n      setTimeout(() =&gt; {resolve(&quot;1&quot;)}, 0)\n});\n\np.then(handleResolved);\n\nsetTimeout(() =&gt; {\n  console.log(&quot;2&quot;);\n}, 0);\n</code></pre>\n<p>In order, here's what this does:</p>\n<ol>\n<li>Assign a function to the <code>handleResolved</code> variable.</li>\n<li>Call <code>new Promise()</code> which immediately and synchronously runs the promise executor callback you pass to it.</li>\n<li>That executor callback, then calls <code>setTimeout(fn, 0)</code> which schedules a timer to run soon.</li>\n<li>Assign the result of the <code>new Promise()</code> constructor to the <code>p</code> variable.</li>\n<li>Execute <code>p.then(handleResolved)</code> which just registers <code>handleResolved</code> as a callback function for when the promise <code>p</code> is resolved.</li>\n<li>Execute the second <code>setTimeout()</code> which schedules a timer to run soon.</li>\n<li>Return control back to the event loop.</li>\n<li>Shortly after returning control back to the event loop, the first timer you registered fires.  Since it has the same execution time as the 2nd one you registered, the two timers will execute in the order they were originally registered.  So, the first one calls its callback which calls <code>resolve(&quot;1&quot;)</code> to cause the promise <code>p</code> to change its state to be resolved.  This schedules the <code>.then()</code> handlers for that promise by inserting a &quot;job&quot; into the promise queue.\nThat job will be run after the current stack frame finishes executing and returns control back to the system.</li>\n<li>The call to <code>resolve(&quot;1&quot;)</code> finishes and control goes back to the event loop.</li>\n<li>Because pending promise operations are served before pending timers, <code>handleResolved(1)</code> is called.  That functions runs, outputs &quot;1&quot; to the console and then returns control back to the event loop.</li>\n<li>The event loop then calls the callback associated with the remaining timer and &quot;2&quot; is output to the console.</li>\n</ol>\n<blockquote>\n<p>What I don't understand is the order in which things are added to the event queue. The first snippet implies that the promise p will run, and then during its execution, resolve is put in the event queue. Once all of p's stack frames are popped, then resolve is run. After than p.then(...) is run, and finally the last console.log(&quot;2&quot;);</p>\n</blockquote>\n<p>I can't really respond directly to this because this just isn't how things work at all.  Promises don't &quot;run&quot;.  The <code>new Promise()</code> constructor is run.  Promises themselves are just notification machines that notify registered listeners about changes in their state.  <code>resolve</code> is not put in the event queue.  <code>resolve()</code> is a function that gets called and changes the internal state of a promise when it gets called.  <code>p</code> doesn't have stack frames.  <code>p.then()</code> is run immediately, not later.  It's just that all that <code>p.then()</code> does is register a callback so that callback can then be called later.  Please see the above 1-11 steps for the sequence of how things work.</p>\n<hr />\n<blockquote>\n<p>In the second example, somehow the number 2 is being printed to the console before the number 1. But would things not be added to the event queue in this order</p>\n</blockquote>\n<p>In the second example, you have three calls to <code>setTimeout()</code> where the third one is nested inside the first one.  This is what changes your timing relative to the first code block.</p>\n<p>We have mostly the same steps as the first example except that instead of this:</p>\n<pre><code>setTimeout(() =&gt; {resolve(&quot;1&quot;)}, 0)\n</code></pre>\n<p>you have this:</p>\n<pre><code>setTimeout(() = &gt; {setTimeout(() =&gt; {resolve(&quot;1&quot;)}, 0)}, 0);\n</code></pre>\n<p>This means that the promise constructor is called and this outer timer is set.\nthen, the rest of the synchronous code runs and the last timer in the code block is then set.  Just like in the first code block, this first timer will get to call its callback before the second one.  But, this time the first one just calls another <code>setTimeout(fn, 0)</code>.  Since timer callbacks are always executed in some future tick of the event loop (not immediately, even if the time is set to <code>0</code>), that means that all the first timer does when it gets a chance to run is schedule another timer.  Then, the last timer in the code block gets it's turn to run and you see the <code>2</code> in the console.  Then, when that's done, the third timer (the one that was nested in the first timer) gets to run and you see the <code>1</code> in the console.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 4,
                    "creation_date": 1614305105,
                    "question_id": 66379098,
                    "title": "How Does the JavaScript Interpreter add Global Statements to the Event Queue?",
                    "body": "<p>I am not sure how statements in the global scope are placed into the JavaScript event queue. I first thought that the interpreter went through and added all global statements into the event queue line by line, then went and executed each event, but that logic does not line up with the example given below. How does the JavaScript interpreter add global statements to the event queue, and why is the output from the two examples given below different?</p>\n<pre class=\"lang-js prettyprint-override\"><code>let handleResolved = (data) =&gt; {\n  console.log(data);\n}\n\nlet p = new Promise((resolve, reject) =&gt; {\n      setTimeout(() =&gt; {resolve(&quot;1&quot;)}, 0)\n});\n\np.then(handleResolved);\n\nsetTimeout(() =&gt; {\n  console.log(&quot;2&quot;);\n}, 0);\n</code></pre>\n<p>The console output to the above code is</p>\n<pre><code>1\n2\n</code></pre>\n<p>Now consider this example. Here, the difference is on the body of the promise callback, as there is a nested <code>setTimeout</code></p>\n<pre class=\"lang-js prettyprint-override\"><code>let handleResolved = (data) =&gt; {\n  console.log(data);\n}\n\nlet p = new Promise((resolve, reject) =&gt; {   \n  setTimeout(() = &gt; {setTimeout(() =&gt; {resolve(&quot;1&quot;)}, 0)}, 0);\n});\n\np.then(handleResolved);\n\nsetTimeout(() =&gt; {\n  console.log(&quot;2&quot;);\n}, 0);\n</code></pre>\n<p>The console output to the above code is</p>\n<pre><code>2\n1\n</code></pre>\n<p>What I don't understand is the order in which things are added to the event queue. The first snippet implies that the promise p will run, and then during its execution, resolve is put in the event queue. Once all of <code>p's</code> stack frames are popped, then <code>resolve</code> is run. After than <code>p.then(...)</code> is run, and finally the last <code>console.log(&quot;2&quot;); </code></p>\n<p>In the second example, somehow the number <code>2</code> is being printed to the console before the number <code>1</code>. But would things not be added to the event queue in this order</p>\n<pre><code>1.) p\n2.) setTimeout( () =&gt; {resolve(&quot;1&quot;)}, 0)\n3.) resolve(&quot;1&quot;)\n4.) p.then(...)\n5.) console.log(&quot;2&quot;)\n</code></pre>\n<p>I clearly have some sort of event queue logic wrong in my head, but I have been reading everything I can and I am stuck. Any help with this is greatly appreciated.</p>\n"
                },
                {
                    "comments": [
                        {
                            "score": 4,
                            "creation_date": 1614509511,
                            "comment_id": 117402021,
                            "body": "It would be helpful if you would explain what the &quot;Maximum subarray problem&quot; is"
                        },
                        {
                            "score": 1,
                            "creation_date": 1614509605,
                            "comment_id": 117402039,
                            "body": "The explanation should be <b>here</b>, as part of your question. This site should not require an external source."
                        },
                        {
                            "score": 0,
                            "creation_date": 1614509785,
                            "comment_id": 117402084,
                            "body": "do you have some examples with result?"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614510358,
                            "comment_id": 117402207,
                            "body": "I added a Codepen link"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614514142,
                            "comment_id": 117403103,
                            "body": "passed 40 tested failed 14.. still trying..."
                        }
                    ],
                    "answers": [
                        {
                            "comments": [
                                {
                                    "score": 1,
                                    "creation_date": 1614515749,
                                    "comment_id": 117403474,
                                    "body": "What does the <code>min</code> signify? What is the need for <code>min = Math.min(sum, min);</code>?"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614517047,
                                    "comment_id": 117403835,
                                    "body": "@DeepakTatyajiAhire ignores negative numbers for <code>sum</code>"
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614517147,
                                    "comment_id": 117403860,
                                    "body": "@DeepakTatyajiAhire I will be update my answer to explain the significance of <code>min</code> in this program in few minutes."
                                },
                                {
                                    "score": 0,
                                    "creation_date": 1614517273,
                                    "comment_id": 117403897,
                                    "body": "That will be cool! Thanks"
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614520010,
                                    "comment_id": 117404573,
                                    "body": "@DeepakTatyajiAhire I have updated my answer to provide more insight on the role of <code>min</code> in the mentioned algorithm."
                                }
                            ],
                            "score": 5,
                            "creation_date": 1614514798,
                            "answer_id": 66409024,
                            "body": "<p>The algorithm you provided is doing the same thing, in a more complex manner though. <em>In order to explain it properly, I will compare the <code>codewars algorithm</code> you provided with the <code>Kadanes algorithm</code> in various steps of their execution.</em></p>\n<p>Let us consider the array:</p>\n<pre><code>[2 -4 3 2 6 -10 -12 20]\n</code></pre>\n<p><em>Here is the <code>codewars algorithm</code> you provided:</em></p>\n<pre><code>var maxSequence = function(arr){\n    var min = 0, ans = 0, i, sum = 0;\n    for (i = 0; i &lt; arr.length; ++i) {\n        sum += arr[i];\n        min = Math.min(sum, min);\n        ans = Math.max(ans, sum - min);\n    }\n    return ans;\n}\n</code></pre>\n<p><em>Here is the implementation of <code>Kadanes algorithm</code> mentioned in Wikipedia:</em></p>\n<pre><code>def max_subarray(numbers):\n&quot;&quot;&quot;Find the largest sum of any contiguous subarray.&quot;&quot;&quot;\nbest_sum = 0  # or: float('-inf')\ncurrent_sum = 0\nfor x in numbers:\n    current_sum = max(0, current_sum + x)\n    best_sum = max(best_sum, current_sum)\nreturn best_sum\n</code></pre>\n<p>In the <em>first step</em>, <code>sum</code> <em><strong>changes to</strong></em> <code>2</code> and <code>min</code> <em>remains the same</em>. The <code>ans</code> <em><strong>changes to</strong></em> <code>2</code>.</p>\n<p>In the <em>second step</em>, <code>sum</code> <em><strong>changes to</strong></em> <code>-2</code> and <code>min</code> <em><strong>changes to</strong></em> <code>-2</code>. The <code>ans</code> <em>is still</em> <code>2</code>. <em>An interesting thing to notice here, according the implementation of <code>Kadanes algorithm</code> by Wikipedia, there in the second stage the value of <code>current_sum</code> will change to <code>0</code></em> which is the correct way to proceed.</p>\n<p>However in the <code>codewars implementation</code>, the value of <code>sum</code> is <code>-2</code>. If you notice a little more carefully though, you will observe that <em>the value of <code>sum-min</code> is <code>0</code></em> in the <code>codewars implementation</code>. This is a really important point to notice. <em>Instead of changing sum to <code>0</code> when its value reaches <code>less than 0</code>. We <strong>store the minimum number that must be substracted from <code>sum</code> to make the <code>net sum 0</code>.</strong> This value is stored in <code>min</code> and which also explains why it is named so.</em></p>\n<p>Here is a record of the value of variables so far:</p>\n<pre><code> sum    min    ans\n  2      0      2     //ans = max(0, 2-0)\n -2     -2      2     //ans = max(2, -2+2)    \n</code></pre>\n<p>In the <em>third step</em> is where the root of the algorithm lies. I will explain this step in detail.</p>\n<p>The <code>sum</code> <em><strong>changes to</strong></em> <code>1</code>. <code>min</code> <em>still remains the same</em>. The <code>ans</code> <em><strong>changes to</strong></em> <code>3</code> which is the correct. How did this happen though?</p>\n<p>Well <em>in the Kadanes algorithm</em>, you change the value of <code>current_sum</code> to <code>3</code> at this stage. In the <code>codewars implementation</code>, instead of changing <code>sum</code> to <code>3</code>, what they have done is used a <em><code>min</code> variable which I repeat again stores the number that should be substracted from answer so that we obtain the same value as we do in <code>current_sum</code>.</em> This is more clear from this part of the algorithm.</p>\n<pre><code>ans = Math.max(ans, sum - min);   //sum-min is current_max\n</code></pre>\n<p>Here when we substract the <code>min</code> from your <code>sum</code>. <em>It neutralizes that extra negative in your answer.</em> In this array <code>A</code>, the extra negative is <code>2 + (-4) = -2</code>. In each of the following steps, we will observe that here <em><code>sum</code> is <strong>not</strong> containing the maximum continuous subarray sum. <strong>Maximum continuous subarray sum there is stored in <code>sum - min</code>.</strong></em> This is the key of this algorithm. <em><code>sum-min</code> is the <code>current_sum</code> here</em>. Here are the following steps:</p>\n<pre><code>sum    min    ans\n 1     -2      3      //ans = max(2, 1+2)\n 3     -2      5      //ans = max(3, 3+2)\n 9     -2      11     //ans = max(5, 9+2)\n-1     -2      11     //ans = max(11, -1+2)\n</code></pre>\n<p><em>In is interesting to observe that even though the value of sum is negative in the last step, the value of min does not change</em>. Why is that? The answer is <code>it does not need to</code>. If you look at <code>sum-min</code> is this case, it is <code>1</code> and not <code>less than 0</code>. Hence <em>there is a possibility that if sufficient positive numbers follow after the <code>current index</code> in <code>A</code>, the value of <code>sum-min</code> might exceed the current value of <code>ans</code>.</em> If you dry run <code>Kadanes algorithm</code> till this step, you will notice that even there the value of <code>current_sum</code> will not change to <code>0</code> at this stage, it will be <code>1</code>. Here are the remaining steps:</p>\n<pre><code>sum    min    ans\n-1     -2      11     //ans = max(11, -1+2)\n-13    -13     11     //ans = max(11, -13+13)\n 7     -13     20     //ans = max(11,  7+13)\n</code></pre>\n<p>The most important point in this implementation, <code>sum-min</code> here is analogous to <code>current_sum</code> of <code>Kadanes algorithm</code>.</p>\n<p>I should also mention that the <code>Kadanes algorithm</code> and <code>codewars algorithm</code> you provided will <strong>not</strong> work if the <em>input array consists of all negative numbers</em>. Both are <code>not meant for it</code>. There is a small implementation difference in the <code>Kadanes algorithm</code> if you want it to work for array consisting of all negative numbers (initialize <code>current_sum</code> to <code>A[0]</code>).</p>\n<p>I hope I have helped you. <em>Do comment if you face any problems in understanding my explanation.</em></p>\n"
                        },
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614516604,
                                    "comment_id": 117403708,
                                    "body": "The implementation provided in the question <i>is not meant for arrays which contain all negative numbers.</i> Even the implementation of  <code>Kadanes algorithm</code> provided in the question will also <b>not</b> work in this case. A change in the given algorithm is required.  Here is a link to the <code>Kadanes algorithm</code>: <a href=\"https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane&#39;s_algorithm\" rel=\"nofollow noreferrer\">en.wikipedia.org/wiki/&hellip;</a>"
                                }
                            ],
                            "score": 1,
                            "creation_date": 1614516124,
                            "answer_id": 66409206,
                            "body": "<p>I don't think the the Codewars algorithm will work for every test case.</p>\n<p>Following are the test cases where this algorithm will fail:</p>\n<p><strong>Test Case 1:</strong> arr = [-1]</p>\n<p><strong>Test Case 2:</strong> arr = [-1, -2]</p>\n<p>For both the test cases, the algorithm under test gives an output equal to <code>0</code>, which is not the correct answer.</p>\n<p><strong>PS:</strong> I have checked the Codewars problem. The test cases for the problem are not yet <strong>comprehensive</strong> and this problem has issues.</p>\n<p>So for the time being, Kadane's algorithm is a good choice to solve the problem in linear time complexity.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 4,
                    "creation_date": 1614509252,
                    "question_id": 66408197,
                    "title": "Maximum subarray problem - min value solution?",
                    "body": "<p>Have you ever felt like your head wasn't meant for an algorithm?</p>\n<p>I tried solving the <a href=\"https://en.wikipedia.org/wiki/Maximum_subarray_problem\" rel=\"nofollow noreferrer\">maximum subarray problem</a> and I came across this solution on Codewars:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>var maxSequence = function(arr){\n  var min = 0, ans = 0, i, sum = 0;\n  for (i = 0; i &lt; arr.length; ++i) {\n    sum += arr[i];\n    min = Math.min(sum, min);\n    ans = Math.max(ans, sum - min);\n  }\n  return ans;\n}\n\nconsole.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, -4]));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>I understand how to solve this problem with a linear time complexity using <code>Kadane's algorithm</code>:</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>var maxSequence = function(arr){\n  let max = 0;\n  let localMax = 0;\n\n  for (let i = 0; i &lt; arr.length; i++) {\n    localMax = Math.max(localMax + arr[i], arr[i]);\n    max = Math.max(localMax, max);\n  }\n\n  return max;\n}\n\nconsole.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, -4]));</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>But I can't make sense of why the first solution works. I simply can't grasp the idea behind it. I feel like a need a little help getting over the hump.</p>\n<p>Edit: Here's a <a href=\"https://codepen.io/florianmartens/pen/zYoWwVX?editors=1010\" rel=\"nofollow noreferrer\">Codepen</a> with some examples</p>\n"
                },
                {
                    "comments": [
                        {
                            "score": 0,
                            "creation_date": 1613923646,
                            "comment_id": 117220034,
                            "body": "AFAIK Google APIs are only restricted in the way you describe when calling then via AJAX. And the reason for that is primarily CORS restrictions. If you call them from a non-AJAX context then that doesn&#39;t apply. And it can&#39;t apply - &quot;domain&quot; isn&#39;t really a concept in a more general HTTP request context. A request can be made from a home computer to an API, and that machine is not part of any domain, yet the request is still legitimate"
                        },
                        {
                            "score": 0,
                            "creation_date": 1613923816,
                            "comment_id": 117220080,
                            "body": "Also, to further the comparison with Google, they generally only use API key authentication for requesting data which is already public - e.g. public calendar data etc. If you wanted to access something private (e.g. email) you have to use a stronger authentication method. Ultimately though, no matter what authentication system you use, if someone decides to share their credentials with someone else on purpose that&#39;s their problem, not yours. and there&#39;s not a lot you can do about it."
                        },
                        {
                            "score": 0,
                            "creation_date": 1613924039,
                            "comment_id": 117220164,
                            "body": "@ADyson Thanks for reply, But the idea of this API is to provide Video service and play it on their window after successful authentication so as in this case we only want to play video on those domains which are allowed. Otherwise if they share their API it is gonna be our loss as we are providing video access for free."
                        },
                        {
                            "score": 0,
                            "creation_date": 1613924270,
                            "comment_id": 117220240,
                            "body": "Well you can implement CORS restrictions for Ajax access, which restricts access to specific domains. but it&#39;s unclear how your actual video playback works. Maybe you can also implement maximum concurrent logins like Netflix does. It&#39;s not very clear if you are providing this service to websites, or to consumers directly? The context makes a difference to how you implement it."
                        },
                        {
                            "score": 1,
                            "creation_date": 1613924530,
                            "comment_id": 117220333,
                            "body": "How can I do CORS restriction ajax, as the whole point where i stuck is how do i can know from which domain i get the request."
                        },
                        {
                            "score": 0,
                            "creation_date": 1613925409,
                            "comment_id": 117220584,
                            "body": "In PHP you can check <code>$_SERVER[&#39;HTTP_ORIGIN&#39;]</code> - if it&#39;s an AJAX request then normally this is populated with the domain the request came from. You can then use that to set appropriate CORS response headers. See <a href=\"https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers\" title=\"cross origin request headerscors with php headers\">stackoverflow.com/questions/8719276/&hellip;</a>"
                        }
                    ],
                    "answers": [
                        {
                            "comments": [
                                {
                                    "score": 0,
                                    "creation_date": 1614239340,
                                    "comment_id": 117326029,
                                    "body": "But then how does other API&#39;s does it ?"
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614240998,
                                    "comment_id": 117326697,
                                    "body": "@Akhilesh they do it using combinations of the methods mentioned. They may whitelist by IP. They use CORS. They use stronger authentication for more valuable data. They use mitigations like limiting concurrent use. I already explained to you how Google API does it. You seem to think there is some magic answer that we are deliberately not telling you. There isn&#39;t."
                                },
                                {
                                    "score": 2,
                                    "creation_date": 1614241644,
                                    "comment_id": 117326967,
                                    "body": "@Akhilesh if your project is a serious one and you have big concerns about this issue, you should employ a security consultant with experience of web applications and APIs. Then, when they have analysed all your requirements and constraints and use cases in greater detail than is possible here, you might get some more bespoke advice and a roadmap. Out of necessity, in this volunteer-run site, you will tend to get general advice and we don&#39;t have time to ask you about every single detail of your app in order to suggest the idea solution for your exact scenario. That&#39;s work you need to do."
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614241787,
                                    "comment_id": 117327036,
                                    "body": "@Akhilesh P.S. of course there are non-technical mitigations too. Set terms of service which make clear that the user&#39;s account can be revoked if they share the credentials or API keys inappropriately with others, and that someone using them inappropriately can be banned from the service. And copyright/license your content in an appropriate way such that there would be legal consequences for mis-use of it. This will not deter everyone but it might help. Consult a lawyer with relevant experience for more details."
                                },
                                {
                                    "score": 1,
                                    "creation_date": 1614242125,
                                    "comment_id": 117327156,
                                    "body": "@Akhilesh potentially some other considerations here too: <a href=\"https://www.quora.com/How-does-Netflix-prevent-users-from-downloading-streamed-video-content\" rel=\"nofollow noreferrer\">quora.com/&hellip;</a> . I suspect Netflix clients are authenticating with the server using more than just a simplistic host key."
                                }
                            ],
                            "score": 5,
                            "creation_date": 1614224149,
                            "answer_id": 66362032,
                            "body": "<p>The only way to do this is to check the origin and referrer headers.</p>\n<p>Unfortunately, server to server this can't be done reliably as the referrer and origin headers would be set by the coder and so can be spoofed easily.  For server to server calls you would be better off whitelisting IP addresses that are allowed to make calls to your APIS. In this case use something like <a href=\"https://stackoverflow.com/questions/13646690/how-to-get-real-ip-from-visitor/13646848\">How to get Real IP from Visitor?</a> to get the real IP of the server and verify it against whitelisted IPs.</p>\n<p>Assuming this is a JS call in browser and not server to server, and that you trust the browser, the only way this can really be done is by verifying the referrer and origin headers. This can still be spoofed with a browser plugin or even with a tool like Postman so I don't recommend it for high security.  Here is a PHP example for verifying the origin or referrer.</p>\n<pre><code>$origin_url = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'];\n$allowed_origins = ['example.com', 'gagh.biz']; // replace with query for domains.\n$request_host = parse_url($origin_url, PHP_URL_HOST);\n$host_domain = implode('.', array_slice(explode('.', $request_host), -2));\nif (! in_array($host_domain, $allowed_origins, false)) {\n    header('HTTP/1.0 403 Forbidden');\n    die('You are not allowed to access this.');     \n}\n</code></pre>\n<p>Optionally also CORS headers are good as commented by @ADyson <a href=\"https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers\">Cross-Origin Request Headers(CORS) with PHP headers</a></p>\n"
                        },
                        {
                            "score": 0,
                            "creation_date": 1614695173,
                            "answer_id": 66441275,
                            "body": "<p>I would like to suggest making a quote or limit for the number of request, so when the paid API reach for 100 request the key will stop working, then the person who paid will not give the key for others. This is not perfect solution, but I would suggest it cause most API services uses it.</p>\n"
                        }
                    ],
                    "is_answered": true,
                    "score": 4,
                    "creation_date": 1613920570,
                    "question_id": 66303784,
                    "title": "Restrict PHP API for specific domains which are saved in my database",
                    "body": "<p>I have created an API which takes the hostkey or API_KEY and then it validates and gives back JWT token. Everything is working fine, I can't access the restricted routes without Hostkey.</p>\n<p><strong>ISSUE</strong></p>\n<p>The major issue is that what will happen if someone gives this hostkey to others as it will no longer be protected or it will be misused. So what I want to do is not only validate the hostkey but also validate the domain from which request came from. It is kind of paid service and I really want to restrict is to specific domains. Just like google does with MAP Api as if we add that map key to other domain it throws an error.</p>\n"
                }
            ]
        )
    }

    useEffect(() => {
        }, []
    )

    return (
        <HomeContainer>
            <Title>EXPLORE STACKOVERFLOW</Title>
            <SearchContainer>
                <TextField style={{width: "500px"}} id="standard-basic" label="Search Tagged" value={tagged}
                           onChange={handleSearchInput}/>
                <Button onClick={handleSearch} style={{background: "black", color: "white", marginLeft: "10px"}}
                        variant="contained"
                >Search</Button>
            </SearchContainer>
            <ListContainer>
                {questions.map((question, index) => <div style={{width: "100%"}} key={index}>
                        <ListItem question={question} index={index} title={question.title}>{"Hahah"}
                        </ListItem>
                    </div>
                )
                }
            </ListContainer>
        </HomeContainer>
    );
}

const ListItemDiv = styled.div`
    display: flex;    
    width:100%
    margin: 15px;
    padding:10px;
    margin-left: 100px;
    cursor:pointer;
`
const Details = styled.div`
     display:flex;
    flex-direction:column;
    margin:3px;
`
const QuestionTitle = styled.h2`
    font-size:20px;
    color:black;
    text-align:left;
    cursor:pointer;
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    
`

const DetailsContainer = styled.div`
       display:flex;
    flex-direction:column;       
    border: 1px solid gray;
        padding:10px;
    width:80%;
`
const TitleSection = styled.div`
    display:flex;
    flex-direction: column;
`
const TitleSectionInner = styled.div`
        margin-left: auto;
`
const Pre = styled.pre`
    background:#DCDCDC;
    width: 100%;
    align-self: flex-start;
    text-align: left;
`

function ListItem(props) {
    let [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }
    return (
        <ListItemDiv>
            <DetailsContainer onClick={handleShow}>

                <QuestionTitle>
                    {"("}{props.index + 1}{") "}
                    <div style={{width: "500px", alignSelf: "flex-start"}}>{props.title}</div>
                    <TitleSection style={{marginLeft: "auto"}}>
                        <div>{"Date Created: "}{props.question.creation_date}</div>
                        <div>{"Votes: "}{props.question.score}</div>

                    </TitleSection>
                </QuestionTitle>

                <Collapse in={show}>
                    <Details>
                        <div>{"Votes: "}{props.question.score}</div>
                        {props.question.is_answered && <div>Answered</div>}
                    </Details>
                    <div style={{textAlign:'left'}}>{<InnerHTML  html={props.question.body}/>}</div>
                </Collapse>
            </DetailsContainer>
            <Button variant="contained" style={{
                background: !show ? "#EF8236" : "black",
                boxShadow: "0px 0px 4px black",
                color: "white",
                height: "40px",
                width: "150px",
                margin: "4px"
            }} onClick={handleShow}>{show ? "HIDE" : "SHOW"} THREAD</Button>
        </ListItemDiv>
    )
}

export default Home;
