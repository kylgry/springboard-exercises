const App = () => (
  <div>
    <Person name="Michaelangelo" age={22} hobbies={["running", "reading"]}/>
    <Person name="Kaylee" age={13} hobbies={["cupcakes", "gossiping"]} />
    <Person name="Jasmine" age={55} hobbies={["gardening", "herbalism"]} />


  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
