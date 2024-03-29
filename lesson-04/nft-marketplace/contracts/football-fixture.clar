
;; title: football-fixture
;; version: 1.0.0
;; summary: smart contract to save and update Copa America results
;; description:

;; traits
;;

;; token definitions
;;

;; constants - teams
;;
(define-constant peru u1)
(define-constant argentina u2)
(define-constant chile u3)
(define-constant colombia u4)


;; errors
;;
(define-constant ERR_INVALID_VALUE (err u2000))
(define-constant ERR_DUPLICATED_VALUE (err 2001))

;; data vars
;;
(define-data-var team-ranking-list uint u0)
;; (define-data-var lock-time (var u64))
;; data maps
;;

;; Define a map data structure for detail team map<uint, tupla> = map<id, detail>
(define-map teams
  uint
  {
    name: (string-ascii 10),
    captain: (string-ascii 10)
  }
)

;; ;; Definir a map for match map<orden, tupla {playe1, player2, resultado}>
;; (define-map match
;;   uint,
;;   {
;;     player1: (string-ascii 10),
;;     player2: (string-ascii 10),
;;     result: uint,
;;     point1: uint,
;;     point2: uint,
;;   }
;; )

;; map<uint, uint> = map<id, points> tabla de puntos
(define-map points
    uint
    uint
)

;; public functions
;;
(define-public (init-football-play)
    (begin 
        (map-set teams peru { name: "Peru", captain: "Paolo"})
        (map-set teams argentina { name: "Argentina", captain: "Messi"})
        (map-set teams chile { name: "Chile", captain: "y"})
        (map-set teams colombia { name: "Colombia", captain: "z"})
        (ok "Play started")
    )
)

(define-data-var winner uint u0)

;; ejecuta un partido o encuentro futbol
(define-public (set-football-match (player1 uint) (player2 uint))
    (begin
       ;; calculate the winner
        (if (> player1 player2)
            ;; set player 1 as a winner
            (var-set winner player1)
            ;; set player 2 as a winner
            (var-set winner player2)
        )
        (update-points (var-get winner))
        (ok "Football match has completed")
    )
)

;; read only functions
;;
(define-read-only (get-team-detail (id uint))
  (map-get? teams id)
)

(define-read-only (get-team-points (id uint))
  (map-get? points id)
)

;; private functions
;;
(define-private (update-points (temp-winner uint))
    (map-set points temp-winner u3)
)