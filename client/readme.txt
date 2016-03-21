znane bledy:
* jak startujê wykres generuj¹cy losowe dane i zamykam okienko, to po jego otworzeniu wykresu nie ma
* logika aplikacji przy edytowaniu workera i usunieciu tegoz samego iksem na liscie
* nie wszystkie szerokosci strony sie idealnie wyswietlaja


Organizacja kodu:
* nie wiem czy nie ma bardziej optymalnego  rozwi¹zania ni¿ dodawanie do ka¿dej dyrektywy frame <div mainctrl="mainctrl" frame-dir
* Jest du¿o logiki w kontrolerze people, ale nie wiem jak siê zabraæ za eksportowanie jej do serwisów/fabryk
* doda³em do folderu common dyrektywê flowChart i jest w niej kilka funkcji, dobrze by by³o je przenieœæ do kontrolera, ale ta dyrektywa jest w dwóch kontrolerach i nie wiem czy do ka¿dego z nich dodaæ te same funkcje czy stworzyæ kontroler w common i go podpi¹æ jakoœ pod t¹ dyrektywê, albo zastosowaæ tu jeszcze inny wzorzec

**napisa³em parê tasków pod build gulpa, ale nie wiem jak je po³¹czyæ...