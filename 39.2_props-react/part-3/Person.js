const Person = (props) => {

  let age_msg;
  if (props.age >= 18) { age_msg = <h3>please go vote!</h3> }
  else { age_msg = <h3>you must be 18.</h3> }

  let name;
  if (props.name.length > 8) { name = props.name.slice(0,6) }
  else { name = props.name }

  let hobbies = props.hobbies.map(hobby => <li>{hobby}</li>);


  return (
    <div>
    <p>Learn some information about this person.</p>
    <ul>
      <li>Name: {name}</li>
      <li>Age: {props.age}</li>
      <li>Hobbies:
        <ul>
          {hobbies}
        </ul>
      </li>
    </ul>
    {age_msg}
    </div>
  )
}
