import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Sfondo chiaro
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 20,
    marginTop: 100,
    fontFamily: "Roboto", // Font personalizzato
  },
  goalText: {
    fontSize: 18,
    color: "#333333",
    fontFamily: "Roboto", // Font personalizzato
    marginVertical: 10,
  },
  progressBarContainer: {
    width: "100%", // Larghezza della progress bar
    height: 30,    // Altezza della progress bar
    marginVertical: 20,
    backgroundColor: "#E0E0E0", // Colore di sfondo della barra
    borderRadius: 10,
    overflow: "hidden", // Per evitare che la barra di progresso esca
  },
  progressBar: {
    height: "100%", // Assicurati che la ProgressBar copra tutta l'altezza del contenitore
    borderRadius: 10, // Angoli arrotondati
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 40, // Spazio extra per evitare che l'interfaccia sembri troppo affollata
  },
  button: {
    backgroundColor: "#FF6F61", // Colore pulsante
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "40%", // Due pulsanti per riga
    shadowColor: "#000", // Ombra per effetto tridimensionale
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Aggiungi ombra per una sensazione di profondità
  },
  button1: {
    backgroundColor: "#ff0000", // Colore pulsante
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "43%", // Due pulsanti per riga
    shadowColor: "#000", // Ombra per effetto tridimensionale
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Aggiungi ombra per una sensazione di profondità
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Roboto", // Font personalizzato
  },
  congratulationsMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F61", // Colore per il messaggio di congratulazioni
    marginTop: 20,
  },
});
