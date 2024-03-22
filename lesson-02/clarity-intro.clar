;; CLARITY.TOOLS
;;
;; Build smart contracts on the Stacks blockchain.
;; Open the drawer on the left for an introduction to Clarity,
;; contract examples, and extended language features.

;; Expressions are instantly evaluated in the side panel:

(print "Hello World")



;;
;; TIPADO
;;

(+ (+ 2 3) (+ 6 6) 2 2 2 2 (+ 3 4) (* 2 3))
(+ u2 u3)

;;
;; PRIMITIVOS
;;


;; Enteros con signo
(- 5 10)
(/ 100 4)
(* 100 4)


;; Enteros sin signo
(+ u2 u3)
(* u2 u16)
(/ u10 u3)
(+ u3 (+ u2 (+ u1 u0)))

(+
   (+ 2 4)
   (- 13 5)
   5)
   
(* 0 100)

   
;; Booleanos

(not (and true false))
(and (and true false) (and true false) (and true false) (and true false) (and true false))
(or false true false)


;;
;; SECUENCIAS
;;


;; Strings

;; Cadenas ASCII: Solo pueden contener caracteres latinos básicos.Cadenas 
(print "This is an ASCII string")

;; UTF-8: Pueden contener caracteres especiales e incluso emojis.

(print u"Este es un Camión")


;; Listas
(list 4 8 15 16 23)
(list "Hello" "World" "!")

;; Ejemplo de lista inválida
(list u5 10 "hello")
(list 2 "hola")



;; Operaciones sobre listas
(map not (list true true false false))
;; false false true
(len "How long is this string")
(len (list 4 8 15 16 23))
(element-at (list 4 8 15 16 23 42) u5)
(index-of (list 4 8 15 16 23 42) 4)


;; Optionals
(some u5)
(some "An optional containing a string.")
;; esto es la direccion de un contrato en testnet
(some 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE)
none

;; Veamos cuando obtenemos un valor none
(element-at (list 4 8 15 16 23 42) u100)


;;
;; TUPLAS
;;

{
  id: u5,
  username: "jonathan",
  address: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE
}
 
 

;; Para obtener un valor:
(get username { id: 5, username: "jonathan"})
(get enable { id: 1, enable: false})


;;
;; PRINCIPALS
;;

;;Los principales de contrato son una combinación del principal estándar que implementó el contrato y el nombre del contrato, delimitados por un punto:
'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE
'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.my-awesome-contract

;;Para recuperar el saldo actual de STX de un principal, podemos pasarlo a la función stx-get-balance.*
(stx-get-balance 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE)
(stx-get-balance 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.my-contract)

