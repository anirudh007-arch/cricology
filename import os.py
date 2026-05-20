import os
import re
from collections import defaultdict

folder_path = "logs"

pattern = re.compile(
    r"URI\s*-\s*([^|]+?)\s*\|\s*Method\s*-\s*([^|]+?)\s*\|.*?status\s*-\s*(\d+)",
    re.IGNORECASE
)

total_api_calls = 0
success_count = 0
failure_count = 0

distinct_apis = set()
api_call_summary = defaultdict(int)
failed_api_summary = defaultdict(int)

for file_name in os.listdir(folder_path):
    if file_name.endswith(".csv"):
        file_calls = 0
        file_success = 0
        file_failure = 0

        file_path = os.path.join(folder_path, file_name)

        with open(file_path, "r", encoding="utf-8") as file:
            for line in file:
                match = pattern.search(line)

                if match:
                    uri = match.group(1).strip()
                    method = match.group(2).strip()
                    status = int(match.group(3).strip())

                    key = f"{method} {uri}"

                    total_api_calls += 1
                    file_calls += 1

                    distinct_apis.add(key)
                    api_call_summary[key] += 1

                    if 200 <= status < 300:
                        success_count += 1
                        file_success += 1
                    else:
                        failure_count += 1
                        file_failure += 1
                        failed_api_summary[key] += 1

        print(f"\n===== FILE: {file_name} =====")
        print(f"Total Calls : {file_calls}")
        print(f"Success : {file_success}")
        print(f"Failure : {file_failure}")

print("\n===== FINAL SUMMARY =====")
print(f"Total API Calls : {total_api_calls}")
print(f"Distinct APIs : {len(distinct_apis)}")
print(f"Success Calls : {success_count}")
print(f"Failure Calls : {failure_count}")

print("\n===== API WISE COUNT =====")
for api, count in api_call_summary.items():
    print(f"{api} --> {count}")

print("\n===== TOP FAILED APIS =====")
sorted_failed = sorted(
    failed_api_summary.items(),
    key=lambda x: x[1],
    reverse=True
)

for api, count in sorted_failed[:5]:
    print(f"{api} --> {count}")