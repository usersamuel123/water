const BOT_TOKEN = "7881617405:AAHz4iyKAxS4Tphu8vOsnP5gAUxkBeJStZE";
const CHAT_ID = "963892922";  

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ProgressBar } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { styles } from "../style";

export default function HomeScreen() {
  const dailyGoal = 2000;
  const [waterIntake, setWaterIntake] = useState(0);
  const waterRef = useRef(waterIntake);

  // Richiedi i permessi per le notifiche
  useEffect(() => {
  
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("⚠️ Permessi per le notifiche negati!");
      } else {
        console.log("✅ Permessi notifiche concessi!");
        scheduleWaterReminders();
      }
    })();
  }, []);

  // Pianifica notifiche ogni ora dalle 08:00 alle 22:00 (per bere 200 ml)
  const scheduleWaterReminders = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync(); // Rimuove le vecchie notifiche

    const startHour = 8;
    const endHour = 22;
    const totalReminders = 8; // 8 promemoria al giorno (200ml per ogni notifica)
    const intervalMinutes = 105; // 1 ora e 45 minuti per ogni notifica
    ; // circa ogni 105 minuti

    let reminderTime = new Date();
    reminderTime.setHours(startHour, 0, 0, 0); // Primo promemoria alle 08:00

    for (let i = 0; i < totalReminders; i++) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💧 Promemoria Acqua",
          body: "Bevi 200ml d'acqua per rimanere idratata!",
          sound: true,
        },
        trigger: { date: new Date(reminderTime) },
      });

      console.log(`⏳ Notifica impostata per: ${reminderTime.toLocaleTimeString()}`);

      reminderTime.setMinutes(reminderTime.getMinutes() + intervalMinutes); // Imposta il prossimo intervallo
    }
  };

  // Funzione per inviare il messaggio su Telegram
  const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
    } catch (error) {
      console.error("❌ Errore invio Telegram:", error);
    }
  };

  // Funzione per inviare il report giornaliero su Telegram
  const sendDailyReport = (totalWater) => {
    const reportMessage = `📊 Report Giornaliero: Hai bevuto ${totalWater}ml di acqua oggi!`;
    sendTelegramMessage(reportMessage);
  };

  // Reset delle notifiche alle 22:00 e riprogrammazione per il giorno successivo
  const resetDailyNotifications = async () => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(22, 0, 0, 0); // Imposta il reset alle 22:00

    if (now >= resetTime) {
      console.log("🛑 Reset delle notifiche giornaliere...");
      await Notifications.cancelAllScheduledNotificationsAsync(); // Cancella tutte le notifiche

      // Attendi 2 secondi e riprogramma per il giorno successivo
      setTimeout(async () => {
        console.log("🔄 Programmazione nuove notifiche per domani...");
        await scheduleWaterReminders();
      }, 2000);
    }
  };

  // Effettua il reset delle notifiche ogni minuto
  useEffect(() => {
    const interval = setInterval(() => {
      resetDailyNotifications();
    }, 60000); // Controlla ogni minuto

    return () => clearInterval(interval);
  }, []);

  // Funzione per aggiungere acqua
  const addWater = (amount) => {
    setWaterIntake((prev) => Math.max(0, prev + amount));
  };

  // Funzione per inviare "Mi manchi" su Telegram
  const sendMissingMessage = () => {
    sendTelegramMessage("Mi manchi amore mio ❤️");
  };

  // Report giornaliero
  useEffect(() => {
    waterRef.current = waterIntake;
  }, [waterIntake]);

  useEffect(() => {
    const now = new Date();
    const millisTillMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59) - now;

    console.log(`⏳ Timer impostato per il report giornaliero (${millisTillMidnight / 1000}s)`);

    const timer = setTimeout(() => {
      sendDailyReport(waterRef.current);
      setWaterIntake(0);
    }, millisTillMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Water Tracker</Text>
      <Text style={styles.goalText}>
        Hai bevuto {waterIntake}ml di {dailyGoal}ml
      </Text>

      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={waterIntake / dailyGoal}
          color="#FF6F61"
          style={styles.progressBar}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addWater(-200)}>
          <Text style={styles.buttonText}>-200ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addWater(200)}>
          <Text style={styles.buttonText}>+200ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addWater(-500)}>
          <Text style={styles.buttonText}>-500ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addWater(500)}>
          <Text style={styles.buttonText}>+500ml</Text>
        </TouchableOpacity>
      </View>

      {/* Pulsante "Mi manchi" */}
      <TouchableOpacity
        style={styles.button1}
        onPress={sendMissingMessage}
      >
        <Text style={styles.buttonText}>Mi manchi ❤️</Text>
      </TouchableOpacity>
    </View>
  );
}
