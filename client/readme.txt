znane bledy:
* jak startuj� wykres generuj�cy losowe dane i zamykam okienko, to po jego otworzeniu wykresu nie ma
* logika aplikacji przy edytowaniu workera i usunieciu tegoz samego iksem na liscie
* nie wszystkie szerokosci strony sie idealnie wyswietlaja


Organizacja kodu:
* nie wiem czy nie ma bardziej optymalnego  rozwi�zania ni� dodawanie do ka�dej dyrektywy frame <div mainctrl="mainctrl" frame-dir
* Jest du�o logiki w kontrolerze people, ale nie wiem jak si� zabra� za eksportowanie jej do serwis�w/fabryk
* doda�em do folderu common dyrektyw� flowChart i jest w niej kilka funkcji, dobrze by by�o je przenie�� do kontrolera, ale ta dyrektywa jest w dw�ch kontrolerach i nie wiem czy do ka�dego z nich doda� te same funkcje czy stworzy� kontroler w common i go podpi�� jako� pod t� dyrektyw�, albo zastosowa� tu jeszcze inny wzorzec

**napisa�em par� task�w pod build gulpa, ale nie wiem jak je po��czy�...