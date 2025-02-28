package com.flightcoordinator.dataservice.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TimestampValidator.class)
public @interface Timestamp {
  String message() default "Invalid time format. Use HH:MM (24-hour format).";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
