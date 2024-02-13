const Person = ({person, deletePerson }) => {
    const label = 'delete'

    return (
        <div key={person.id}>
        {person.name} {person.number} 
        <button onClick={deletePerson}>{label}</button>
        </div>
    )

}

export default Person