package com.roadwise.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String what, Object id) { super(what + " with id " + id + " was not found"); }
    public ResourceNotFoundException(String message) { super(message); }
}
