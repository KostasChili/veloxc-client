import { Link } from "react-router-dom";



const Public = () => {
  const content = (
    <section >
    <header>
        <h1>Καλώς ήρθατε στη ν.1 εφαρμογή κρατήσεων ραντεβού <span >Velox Constitutio</span></h1>
    </header>
    <main >
        <p>
        Είτε είστε ιδιοκτήτης/τρια επιχείρησης και θέλετε να αυτοματοποιήσετε την διαδικασία κρατήσεων στα ραντεβού σας, <br/>
        Είτε είστε πελάτης/τρια και θέλετε να κλείσετε ραντεβού εύκολα και γρήγορα <br/>
        Εδώ βρίσκεται η λύση σας!
        </p>
        <address >
            Σίνδος <br/>
            Διεθνές Πανεπιστήμιο Ελλάδος<br/>
            Θεσσαλονίκη <br/>
        </address>
        <br/>
    </main>
    <footer>
        <Link to="/login">Σύνδεση Συνεργάτη</Link><br/>
        <Link to="/dash/users/new">Εγγραφή Συνεργάτη</Link>
    </footer>
      
    </section>
  )
  return content;
}

export default Public
