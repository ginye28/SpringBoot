package com.korit.ch01.controller.customer;

import com.korit.ch01.controller.customer.dto.CustomerReqCreate;
import com.korit.ch01.controller.customer.dto.CustomerReqUpdate;
import com.korit.ch01.controller.customer.dto.CustomerResp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/customers")
@RestController
public class CustomerController {

    @PostMapping
    public ResponseEntity<CustomerResp> create(@RequestBody CustomerReqCreate dto) {
        return ResponseEntity.ok(null);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResp>> list(
            @RequestParam(required = false) int query,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phoneE164) {
        System.out.println(query);
        System.out.println(name);
        System.out.println(phoneE164);
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerResp> one(@PathVariable int customerId) {
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerResp> update(@RequestBody CustomerReqUpdate dto) {
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/{customerId}")
    public ResponseEntity<CustomerResp> modify(@RequestBody CustomerReqUpdate dto) {
        return ResponseEntity.ok(null);
    }

}
