package com.bny.jwt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    /**
     * Serves the login page
     */
    @GetMapping(value = {"/", "/login"})
    public String login() {
        return "forward:/index.html";
    }
    
    /**
     * Serves the dashboard page for authenticated users
     */
    @GetMapping(value = {"/dashboard", "/dashboard/**"})
    public String dashboard() {
        return "forward:/dashboard.html";
    }
    
    /**
     * Fallback for all other routes that don't match API or static resources
     * This ensures React Router can handle all client-side routes
     */
    @GetMapping(value = "/{path:[^\\.]*}")
    public String fallback() {
        return "forward:/index.html";
    }
}
