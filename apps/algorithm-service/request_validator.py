import hmac
import hashlib
import base64
import time

from app.config import get_config as cfg


def verify_signature(received_signature, received_timestamp, data):
    current_time = int(time.time())
    if abs(current_time - int(received_timestamp)) > cfg().get("max_time_diff"):
        return False, "Timestamp expired"

    payload = f"{data}|{received_timestamp}".encode()
    expected_signature = hmac.new(cfg().get("").encode(), payload, hashlib.sha256).digest()
    expected_signature = base64.b64encode(expected_signature).decode()

    if not hmac.compare_digest(received_signature, expected_signature):
        return False, "Invalid signature"

    return True, "Valid signature"
