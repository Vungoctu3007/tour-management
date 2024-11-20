package com.example.tourmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PermissionOperationResponse {
    private int id;
    private String name;
    private List<OperationResponse> operations = new ArrayList<>();

    public void addOperation(OperationResponse operation) {
        this.operations.add(operation);
    }
    public PermissionOperationResponse(int id, String name) {
        this.id = id;
        this.name = name;
        this.operations = new ArrayList<>();
    }
}