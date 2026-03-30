using UnityEngine;
using UnityEngine.Events;

/// <summary>
/// 可交互对象基类
/// 用于创建可以与玩家交互的对象
/// </summary>
public class InteractableObject : MonoBehaviour
{
    [Header("交互设置")]
    [SerializeField] private string interactionPrompt = "按 E 交互";
    [SerializeField] private bool canInteractMultipleTimes = false;
    [SerializeField] private Color highlightColor = Color.yellow;
    
    [Header("事件")]
    public UnityEvent onInteract;
    
    private bool hasBeenInteracted = false;
    private Renderer objectRenderer;
    private Color originalColor;
    private bool isHighlighted = false;
    
    // 公共属性
    public string InteractionPrompt => interactionPrompt;
    public bool CanInteract => !hasBeenInteracted || canInteractMultipleTimes;
    
    void Start()
    {
        objectRenderer = GetComponent<Renderer>();
        if (objectRenderer != null)
        {
            originalColor = objectRenderer.material.color;
        }
    }
    
    /// <summary>
    /// 执行交互
    /// </summary>
    public void Interact()
    {
        if (!CanInteract) return;
        
        hasBeenInteracted = true;
        
        // 触发交互事件
        onInteract?.Invoke();
        
        // 默认交互行为：改变颜色
        PerformInteraction();
        
        Debug.Log($"与对象 {gameObject.name} 进行了交互");
    }
    
    /// <summary>
    /// 执行具体的交互行为
    /// 子类可以重写此方法
    /// </summary>
    protected virtual void PerformInteraction()
    {
        // 默认行为：随机改变颜色
        if (objectRenderer != null)
        {
            objectRenderer.material.color = new Color(
                Random.Range(0f, 1f),
                Random.Range(0f, 1f),
                Random.Range(0f, 1f)
            );
        }
    }
    
    /// <summary>
    /// 高亮显示对象
    /// </summary>
    public void Highlight()
    {
        if (objectRenderer != null && !isHighlighted)
        {
            objectRenderer.material.color = highlightColor;
            isHighlighted = true;
        }
    }
    
    /// <summary>
    /// 取消高亮
    /// </summary>
    public void Unhighlight()
    {
        if (objectRenderer != null && isHighlighted)
        {
            objectRenderer.material.color = originalColor;
            isHighlighted = false;
        }
    }
    
    /// <summary>
    /// 重置交互状态
    /// </summary>
    public void ResetInteraction()
    {
        hasBeenInteracted = false;
        if (objectRenderer != null)
        {
            objectRenderer.material.color = originalColor;
        }
    }
}
