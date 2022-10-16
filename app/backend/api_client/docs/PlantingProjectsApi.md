# openapi_client.PlantingProjectsApi

All URIs are relative to *https://sandbox.api.mastercard.com/priceless-planet-coalition*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_planting_project**](PlantingProjectsApi.md#get_planting_project) | **GET** /planting-projects/{id} | Retrieve a planting project
[**get_planting_projects**](PlantingProjectsApi.md#get_planting_projects) | **GET** /planting-projects | Retrieve planting projects


# **get_planting_project**
> PlantingProject get_planting_project(id)

Retrieve a planting project

Use this API to retrieve a planting project by ID.<br/> Required roles: _priceless-planet-basic_, _priceless-planet-admin_

### Example

```python
from __future__ import print_function
import time
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to https://sandbox.api.mastercard.com/priceless-planet-coalition
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient() as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.PlantingProjectsApi(api_client)
    id = 1 # int | A number which uniquely identifies a Priceless Planet resource

    try:
        # Retrieve a planting project
        api_response = api_instance.get_planting_project(id)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling PlantingProjectsApi->get_planting_project: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A number which uniquely identifies a Priceless Planet resource | 

### Return type

[**PlantingProject**](PlantingProject.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Planting Project was successfully retrieved. |  -  |
**400** | Planting Project Bad Request Error |  -  |
**404** | Planting Project Not Found Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_planting_projects**
> PlantingProjects get_planting_projects(limit=limit, offset=offset, sort=sort)

Retrieve planting projects

Use this API to retrieve a list of planting projects.<br/>

### Example

```python
from __future__ import print_function
import time
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to https://sandbox.api.mastercard.com/priceless-planet-coalition
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient() as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.PlantingProjectsApi(api_client)
    limit = 10 # int | The number of items you want the list to be limited to (optional) (default to 10)
offset = 0 # int | The number of items to offset the start of the list from (optional) (default to 0)
sort = '-createdAt' # str | Allow ascending and descending sorting over one or more fields. For example: <ul>   <li><b>sort=-name</b>: sort on the \"name\" field in descending order.   <li><b>sort=+name</b>: sort on the \"name\" field in ascending order.   <li><b>sort=name</b>: sort on the \"name\" field in ascending order (ascending is default).   <li><b>sort=type,-date</b>: sort on the \"type\" field in ascending order, followed by the \"date\" field in descending order. </ul> (optional) (default to '-createdAt')

    try:
        # Retrieve planting projects
        api_response = api_instance.get_planting_projects(limit=limit, offset=offset, sort=sort)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling PlantingProjectsApi->get_planting_projects: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**| The number of items you want the list to be limited to | [optional] [default to 10]
 **offset** | **int**| The number of items to offset the start of the list from | [optional] [default to 0]
 **sort** | **str**| Allow ascending and descending sorting over one or more fields. For example: &lt;ul&gt;   &lt;li&gt;&lt;b&gt;sort&#x3D;-name&lt;/b&gt;: sort on the \&quot;name\&quot; field in descending order.   &lt;li&gt;&lt;b&gt;sort&#x3D;+name&lt;/b&gt;: sort on the \&quot;name\&quot; field in ascending order.   &lt;li&gt;&lt;b&gt;sort&#x3D;name&lt;/b&gt;: sort on the \&quot;name\&quot; field in ascending order (ascending is default).   &lt;li&gt;&lt;b&gt;sort&#x3D;type,-date&lt;/b&gt;: sort on the \&quot;type\&quot; field in ascending order, followed by the \&quot;date\&quot; field in descending order. &lt;/ul&gt; | [optional] [default to &#39;-createdAt&#39;]

### Return type

[**PlantingProjects**](PlantingProjects.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Planting Projects were successfully retrieved. |  -  |
**400** | Planting Projects Bad Request Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

