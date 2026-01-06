Dokumentation zum Projekt Aare-Check von Sara Imthurn und Jennifer Derrer

Beschreibung:
«Aare-Check» ist eine Website, welche es Personen ermöglicht, jederzeit die Strömungsgeschwindigkeit der Aare an verschiedenen Standorten zu checken. Auf unserem Diagramm sind mehrere Städte am Ufer aufgelistet. Klickt man auf das zugehörige Boot, erscheint ein Pop-up, auf dem man die folgenden Daten ablesen kann: Wassertemperatur, Lufttemperatur, Momentani Strömig und Durchschnittlächi Strömig. Die Daten unserer API werden in unserer Datenbank abgespeichert und weiterverwendet. Da das Thema «Böötle auf der Aare» immer etwas heikel ist und mehrere Unfälle geschehen, haben wir die Website zusätzlich mit einem journalistischen Aufklärungstext versehen.

Learnings:

Jenny: 
Die Theorie in diesem Semester war komplett neu für mich. Im Unterricht konnte ich deshalb sehr viel Neues lernen – vom Erstellen einer Datenbank bis hin zu den ganzen PHP-Dokumenten. Auch bezüglich dem Thema CSS konnte ich in diesem Semester Neues lernen. So arbeitete ich zum ersten Mal mit SVGs im Code und musste herausfinden, ob ich diese im HTML besser als svg anspreche – inkl. Path – oder ob ich diese wie ein «normales» Bild handhabe. Zudem konnte ich dieses Semester bereits besser von mir aus erkennen, wie ich die Blöcke im CSS stylen sollte, und hatte somit einen viel besseren Überblick als bei IM 2. Auch beschäftigte ich mich mehr mit den W3C-Richtlinien, obwohl ich ehrlich sagen muss, dass ich hier noch immer etwas verwirrt bin.
Sara:
Für mich war ebenfalls der ganze PHP-Block neu und ich konnte viel spannendes über Datenbanken, deren Aufbau und Nutzung in der digitalen Welt lernen. Das war sehr spannend und praktisch für das Anwenden im eigenen IM Projekt. Zustäzlich habe ich mein Java-Script-Wissen wieder aufgefrischt und verfestigt. Das war sehr praktisch, da ich nun Dinge (z.B. die if-Schlaufen, oder die .js-Grammatik) verstand, die ich im letzten Semester irgendwie angewendet habe, aber nicht gänzlich verstanden habe.


Schwierigkeiten:

Jenny:
Eine grosse Schwierigkeit in diesem Semester war, dass ich aufgrund von privaten Umständen die letzten beiden Wochen nicht im Unterricht war. Dies erschwerte die Zusammenarbeit erheblich. Wir versuchten, uns deshalb regelmässig auszutauschen, und Sara übernahm netterweise einen grossen Teil des technischen Prozesses. Wegen diesen Umständen musste ich auch viele Probleme beim Coden selbstständig beheben. Einer der grössten Knackpunkte war hier die Position von Elementen. Ich musste den Code sehr oft mit Trial und Error anpassen, weil die SVGs sich anders verhielten, als ich mir vorstellte. Ich googelte deshalb viel und nutzte ChatGPT, um zu verstehen, weshalb mein Code teilweise nicht funktionierte.
Sara:
Das PHP war grösstenteils überfordernd, da es mir sehr schwer fällt "informatik-mässig" logisch zu denken. Allerdings ging das mithilfe sehr hilfsbereiter und geduldiger Dozenten am Schluss doch noch, sodass dieser Teil schlussendlich funktionierte. Javascript war anschliessend die nächste Herausforderung. Das Programmieren des Charts und dessen Design war immer wieder herausfordernd und ich bin immer wieder auf Stolpersteine gestossen. Einen grossen Fehler, den ich gemacht habe, war definitv zu viel ChatGPT benutzt zu haben. Ich habe mich zu oft auf die AI verlassen, ohne wirklich zu verstehen, was sie mir codet, sodass ich nicht wusste, wie den Code korrigieren, wenn er (wie üblicherweise) nicht funktionierte. Somit musste ich einmal die komplette Chart neu programmieren, da ich keine Ahnung mehr hatte, was ich (bzw. ChatGPT) gecodet hat und wie ich den Code korrigieren soll. Das hat sehr viel Zeit gekostet und mir gelehrt, dass AI zwar super praktisch ist, aber man trotzdem nicht auf die faule Haut sitzen darf und AI alles für sich machen lässt.


Benutzte Ressourcen:

Jenny:
Wie oben bereits erwähnt, musste ich in diesem Semester oft auf Google, YouTube-Tutorials und ChatGPT zurückgreifen, wenn mein Code nicht so funktionierte, wie er sollte. Grundsätzlich funktionierte dies sehr gut, besonders im Vergleich zum letzten Semester. Einerseits verstehe ich mittlerweile besser, welche Tags es gibt und welche ich in der jeweiligen Situation am besten verwende, und andererseits nutzte ich die KI zwar, um zu verstehen, weshalb mein Code nicht funktionierte, doch zu 98 % übernahm ich ihn nicht direkt. Denn oftmals verschoss mir das Tool die gesamte Responsiveness. Vielmehr überlegte ich anhand des Outputs, wie ich meinen Code anpassen kann, um zu dem besten Ergebnis zu kommen. Und erhlich gesagt probierte ich oftmals auch einfach unzählige Male verschiedene Positionen aus und verschob die Elemente so lange, bis sie mir passten.
Sara:
Wie schon erwähnt, benutzte ich am meisten ChatGPT und GitHub Copilot, allerdings auch verschiedene Youtube-Tutorials und good-old Google. Es gibt sehr viele Website zum Thema .js-Charts und viele davon sind ziemlich praktisch. Nach meinem grossen Learning mit ChatGPT verwendete ich die AI zwar immer noch, aber kopierte nicht nur einfach blind (grosse) Codeblöcke, sondern wollte sie verstehen, bevor ich sie übernehme. Dadurch sind mir schon ein paar Fehler aufgefallen, bevor ich den Code übernahm und konnte es im Voraus korrigieren, sodass ich gegen Ende des Projekts immer weniger Fehler hatte und schneller vorwärtskam.




Notizen AM SCHLUSS PRUEFEN UND DANN WEG
GitHub-Repository für das Projekt
Jede Projektgruppe erstellt ein öffentlich zugängliches GitHub-Repository, das als zentrale Arbeits- und Abgabeplattform dient. Darin enthalten sein müssen:
vollständiger Projektcode (Frontend, Backend, Datenbankskripte)
ein README.md mit kurzer Projektbeschreibung, Learnings, Schwierigkeiten und genutzten Ressourcen
Links zur laufenden Website, zum Figma-Prototyp und zu den verwendeten APIs
👉 Wichtige Hinweise zur Sicherheit:
Keine sensiblen Dateien wie config.php (mit Datenbankzugangsdaten) oder .vscode/sftp.json ins Repository hochladen.
Nutzt stattdessen eine lokale .env oder eine separate config.template.php, in der nur die Struktur, nicht aber die echten Zugangsdaten hinterlegt sind.
Prüft vor Abgabe, dass keine API-Keys oder Passwörter im Code oder in der Versionsgeschichte auftauchen.
GitHub-Repos sind öffentlich → alles, was ihr committet, ist für alle sichtbar.
👉 Achtung: Das Repository muss bis zum Abgabetermin vollständig sein.
Letzter Commit zählt als Abgabezeitpunkt.
Verspätete Commits führen zu Punktabzug (3 Punkte pro angefangenen 24 Stunden).