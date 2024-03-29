;; An on-chain counter that stores a count for each individual

;; Define a map data structure <key, value>
(define-map counters principal uint)

;; Function to retrieve the count for a given individual
(define-read-only (get-count (who principal))
  (default-to u0 (map-get? counters who))
)

;; Function to count up for ny wallet ST
(define-public (update-counter (who principal))
  (ok (map-set counters who (+ (get-count who) u1)))
)

;; Function to increment the count for the caller
(define-public (count-up)
  (ok (map-set counters tx-sender (+ (get-count tx-sender) u1)))
)