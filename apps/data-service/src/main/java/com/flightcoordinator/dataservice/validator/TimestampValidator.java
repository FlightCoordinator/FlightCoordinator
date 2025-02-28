package com.flightcoordinator.dataservice.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TimestampValidator implements ConstraintValidator<Timestamp, String> {
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null)
      return false;
    return value.matches("^(?:[01]\\d|2[0-3]):[0-5]\\d$");
  }
}
