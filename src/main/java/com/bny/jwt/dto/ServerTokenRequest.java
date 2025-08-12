package com.bny.jwt.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class ServerTokenRequest {
    @NotBlank
    private String serverName;
    
    private List<String> roles;

    public ServerTokenRequest() {}

    public ServerTokenRequest(String serverName, List<String> roles) {
        this.serverName = serverName;
        this.roles = roles;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
