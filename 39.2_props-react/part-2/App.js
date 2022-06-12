const App = () => (
  <div>
    <Tweet user="user1" name="carla" date="2019 Dec 01" msg="hello world!"/>
    <Tweet user="user2" name="david" date="2020 Jan 24" msg="hello world!"/>
    <Tweet user="user3" name="jennifer" date="2022 Mar 01" msg="hello world!"/>

  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
